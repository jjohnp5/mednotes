const passport = require('passport');
const {User} = require('../models/User');
const {ExtractJwt} = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'nursesrock',
};

const jwtStrategy = new JWTStrategy(jwtOptions,
    async (jwtPayload, cb) => {
    // find the user in db if needed
      try {
        const user = await User.findById(jwtPayload.id).exec();
        return cb(null, user);
      } catch (e) {
        return cb(err);
      }
    },
);

const protected = passport.authenticate('jwt', {session: false});

module.exports = {jwtStrategy, protected};
