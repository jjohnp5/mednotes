const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

mongoose.set('returnOriginal', false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nnotes',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});


// const LocalStrategy = require('passport-local').Strategy;
const apiRoutes = require('./routes');
// const passportJWT = require('passport-jwt');
// const jwt = require('jsonwebtoken')

const loginStrategy = require('./middleware/login');
const {jwtStrategy} = require('./middleware/jwt');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.use(passport.initialize());

// Define middleware here
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(helmet());

passport.use('user', loginStrategy);
passport.use('jwt', jwtStrategy);


app.use(apiRoutes);
// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
