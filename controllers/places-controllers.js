const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAdress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
const fs = require('fs');

exports.getPlaceById = async (req, res, next) => {
  const { pid } = req.params;

  let place;
  try {
    place = await Place.findById(pid);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not find a place.', 500)
    );
  }

  if (place.length === 0)
    throw new HttpError('Could not find a place with the provided id.');

  res.json({ place });
};

exports.getPlacesByUserId = async (req, res, next) => {
  const { uid } = req.params;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(uid).populate('places');
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Could not find a place with the provided user id.', 500)
    );
  }
  if (userWithPlaces.length === 0 || !userWithPlaces)
    return next(
      new HttpError('Could not find a place with the provided user id.', 404)
    );

  res.json({ userWithPlaces });
};

exports.createPlace = async (req, res, next) => {
  const validationErrorResult = validationResult(req);
  const { title, description, adress, creator } = req.body;

  if (!validationErrorResult.isEmpty()) {
    console.log(validationErrorResult);
    return next(new HttpError('Invalid Inputs!', 422));
  }

  let coordinates, user;
  try {
    coordinates = await getCoordsForAdress(adress);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    adress,
    creator,
    image: req.file.path.replace(/\\/g, '/'),
  });

  try {
    user = await User.findById(creator);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Creating place failed, Please try again later.', 500)
    );
  }

  if (!user || user.results) {
    return next(new HttpError("Could'nt find user fo provided id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not create a place.', 500)
    );
  }

  res.status(201).json({ place: createdPlace });
};

exports.editPlace = async (req, res, next) => {
  const { pid } = req.params;

  const validationErrorResult = validationResult(req);

  if (!validationErrorResult.isEmpty())
    return next(new HttpError('Invalid Inputs!', 422));

  const { title, description } = req.body;

  let place;

  try {
    place = await Place.findById(pid);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something went wrong, Could'nt update the place.", 500)
    );
  }

  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something went wrong, Could'nt update the place.", 500)
    );
  }
  res.status(200).json({ place });
};

exports.deletePlace = async (req, res, next) => {
  const { pid } = req.params;

  let place;
  try {
    place = await Place.findById(pid).populate('creator');
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something Went wrong, Could'nt delete the place.", 500)
    );
  }

  if (!place)
    return next(new HttpError("Could'nt find place for provided id.", 404));

  const imagePath = place.image.replace(/\//g, '\\');

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something Went wrong, Could'nt delete the place.", 500)
    );
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({ message: 'Deleted place.' });
};
