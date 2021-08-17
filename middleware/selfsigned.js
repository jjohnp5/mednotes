const jwt = require('jsonwebtoken');


const userOwnsRecord = (req, res, next) => {
  try {
    const user = req.query.userId || req.params.id;
    if (!user) {
      throw Error('User Id is required.');
    }
    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET || 'nursesrock');
    if (user === decodedToken.id) {
      return next();
    }
    return res.status(422).json({error: 'Unauthorized.', message: 'You must own record to manipulate.'});
  } catch (err) {
    return res.status(422).json({error: 'Unauthorized.', message: err.message});
  }
};

module.exports = {userOwnsRecord};
