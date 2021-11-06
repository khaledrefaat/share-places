const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  editPlace,
  deletePlace,
} = require('../controllers/places-controllers');

router.get('/:pid', getPlaceById);

router.get('/users/:uid', getPlacesByUserId);

router.use(checkAuth);

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

module.exports = router;
