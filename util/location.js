const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyCLSZasFbjJqYAK3FhTNDOBhIDSPNv7Iw0';

async function getCoordsForAdress(adress) {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      adress
    )}&key=${API_KEY}`
  );
  const { data } = res;

  if (!data || data === 'ZERO_RESULTS') {
    const error = new HttpError(
      "Could'nt find location for the specified adress.",
      422
    );
    throw error;
  }

  console.log(data);

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordsForAdress;
