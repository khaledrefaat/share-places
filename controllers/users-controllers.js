const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  if (!existingUser)
    return next(new HttpError('Email or Password is wrong.', 401));

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError(
        'Could not log you in, Please check your credentials and try again.',
        500
      )
    );
  }

  if (!isValidPassword)
    return next(new HttpError('Email or Password is wrong.', 401));

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      'Super_Secret_Dont_Share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.log(err);
    return next(
      new HttpError(
        'Could not log you in, Please check your credentials and try again.',
        500
      )
    );
  }

  return res.json({
    userId: existingUser._id,
    email: existingUser.email,
    token: token,
  });
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

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    return next(new HttpError('Could not create user, Please try again.', 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Signing up failed, Please try again.', 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      'Super_Secret_Dont_Share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.log(err);
    return next(new HttpError('Signing up failed, Please try again.', 500));
  }

  res
    .status(201)
    .json({ userId: createdUser._id, email: createdUser.email, token: token });
};
