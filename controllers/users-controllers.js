const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(
      new HttpError('Fetching Users failed, Please try again later.', 500)
    );
  }

  res.json({ users });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Signin failed, Please try again later.', 500));
  }

  if (!existingUser || existingUser.password !== password)
    return next(new HttpError('Email or Password is wrong.', 401));

  return res.json({ message: 'Logged in ^_^', user: existingUser });
};

exports.signup = async (req, res, next) => {
  const { name, password, email } = req.body;

  const validationErrorResult = validationResult(req);
  if (!validationErrorResult.isEmpty())
    return next(new HttpError('Invalid Inputs!', 422));

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError('Signing up failed, Please try again later.', 500)
    );
  }

  if (existingUser)
    return next(
      new HttpError('User exists already, Please login instead.', 422)
    );

  const createdUser = new User({
    name,
    email,
    password,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Signing up failed, Please try again.', 500));
  }

  res
    .status(201)
    .json({ message: 'signup was successfully ^_^ ', user: createdUser });
};
