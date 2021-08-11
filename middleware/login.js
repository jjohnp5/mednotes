// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const loginStrategy = new LocalStrategy(async (username, password, done) => {
  console.log(username);
  try {
    const user = await User.findOne({username: username}).exec();
    console.log(user);
    const pw = user.password;
    bcrypt.compare(password, pw, (err, response)=>{
      if (err) {
        console.log(err);
        return done(null, false, {message: 'Incorrect credentials'});
      }
      return done(null, user);
    });
  } catch (err) {
    return done(null, false, {message: 'Incorrect credentials'});
  }
});


module.exports = loginStrategy;
