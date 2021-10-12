const HttpError = require('../models/http-error');
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
  {
    id: 'u1',
    email: 'khaledrefaat08@gmail.com',
    username: 'khaledrefaat08',
    password: 'k@5214705K',
  },
  {
    id: 'u2',
    email: 'khaledrefaat07@gmail.com',
    username: 'khaledrefaat07',
    password: '5214705',
  },
  {
    id: 'u3',
    email: 'khaledrefaat06@gmail.com',
    username: 'khaledrefaat06',
    password: '01062715774',
  },
];

exports.getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  const user = DUMMY_USERS.find(user => user.username === username);
  if (!user || user.password !== password)
    return next(new HttpError('Username or Password Wrong!', 401));

  return res.json({ message: 'Login Sucsess' });
};

exports.signup = (req, res, next) => {
  const { username, password, email } = req.body;

  const validationErrorResult = validationResult(req);
  if (!validationErrorResult.isEmpty())
    throw new HttpError('Invalid Inputs!', 422);

  const hasUser = DUMMY_USERS.find(user => user.username === username);
  if (hasUser) return next(new HttpError('Username already exists', 422));

  const newUser = {
    id: uuid(),
    username,
    password,
    email,
  };

  DUMMY_USERS.push(newUser);
  res.status(201).json({ message: 'signup successfully ^_^' });
};
