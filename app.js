const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Couldnt find this route.');
});
app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }

  if (res.headerSent) return next(err);

  res.status(err.code || 500);
  res.json({ message: err.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    'mongodb+srv://khaledrefaat:5214705@cluster0.nos6l.mongodb.net/sharePlaces?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => console.log(err));
