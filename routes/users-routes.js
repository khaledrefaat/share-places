const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');

const { login, getUsers, signup } = require('../controllers/users-controllers');

router.get('/getusers', getUsers);

router.post('/login', login);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
);

module.exports = router;
