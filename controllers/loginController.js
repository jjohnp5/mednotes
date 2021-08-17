const passport = require('passport');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  passport.authenticate('user', {
    session: false,
  }, (err, user, info) => {
    console.log(info);
    if (err || !user) {
      console.log(err, user);
      return res.status(401).json({
        err,
      });
    }
    req.login(user, {
      session: false,
    }, (err) => {
      if (err) {
        res.send(err);
      }
      console.log(user);
      // generate a signed son web
      // token with the contents of user object and return it in the response
      const token = jwt.sign({
        id: user._id,
        username: user.username,
        position: user.position,
        firstName: user.firstName,
        lastName: user.lastName,
      }, process.env.JWT_SECRET || 'nursesrock', {expiresIn: '7d'});
      return res.json({
        token,
      });
    });
  })(req, res);
};

module.exports = login;
