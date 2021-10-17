const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Couldnt find this route.');
});
app.use((err, req, res, next) => {
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
  .catch(err => console.log(error));
