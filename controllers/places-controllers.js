const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAdress = require('../util/location');

let DUMMY_DATA = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'one of the most famous sky bulding in the world',
    imageUrl:
      'https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    adress: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7481572,
      lng: -73.9848175,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Kensington Palace',
    description:
      'ensington Palace is a royal residence set in Kensington Gardens, in the Royal Borough of Kensington and Chelsea in London',
    imageUrl:
      'https://images.unsplash.com/photo-1565373351918-440f115968fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    adress: 'Kensington Gardens, London W8 4PX',
    location: {
      lat: 51.5049757,
      lng: -0.1854923,
    },
    creator: 'u1',
  },
];

exports.getPlaceById = (req, res, next) => {
  const { pid } = req.params;
  const place = DUMMY_DATA.filter(({ id }) => id === pid);
  if (place.length === 0)
    throw new HttpError('Could not find a place with the provided id.');

  res.json(place);
};

exports.getPlacesByUserId = (req, res, next) => {
  const { uid } = req.params;
  const userPlaces = DUMMY_DATA.filter(({ creator }) => creator === uid);
  if (userPlaces.length === 0 || !userPlaces)
    return next(
      new HttpError('Could not find a place with the provided user id.', 404)
    );
  res.json(userPlaces);
};

exports.createPlace = async (req, res, next) => {
  const validationErrorResult = validationResult(req);
  const { title, description, adress, creator } = req.body;

  if (!validationErrorResult.isEmpty())
    next(new HttpError('Invalid Inputs!', 422));

  let coordinates;
  try {
    coordinates = await getCoordsForAdress(adress);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    adress,
    creator,
  };

  DUMMY_DATA.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

exports.editPlace = (req, res, next) => {
  const { pid } = req.params;

  const validationErrorResult = validationResult(req);

  if (!validationErrorResult.isEmpty())
    next(new HttpError('Invalid Inputs!', 422));

  const updatedPlace = { ...DUMMY_DATA.find(({ id }) => id === pid) };
  const index = DUMMY_DATA.findIndex(places => places.id === pid);
  const { title, description } = req.body;
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_DATA[index] = updatedPlace;
  console.log(index);
  res.status(200).json({ place: updatedPlace });
};

exports.deletePlace = (req, res, next) => {
  const { pid } = req.params;

  if (!DUMMY_DATA.find(({ id }) => id === pid))
    throw new HttpError('Could not find a place with the provided id.');

  DUMMY_DATA = DUMMY_DATA.filter(({ id }) => !id === pid);

  res.status(200).json({ message: 'Deleted place.' });
};
