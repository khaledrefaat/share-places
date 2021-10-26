const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  editPlace,
  deletePlace,
} = require('../controllers/places-controllers');

router.get('/:pid', getPlaceById);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('adress').not().isEmpty(),
  ],
  createPlace
);

router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  editPlace
);

router.delete('/:pid', deletePlace);

router.get('/users/:uid', getPlacesByUserId);

module.exports = router;
