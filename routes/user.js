const expressRouter = require('express');
const router = new expressRouter.Router();
const userController = require('../controllers/user');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
const {userOwnsRecord} = require('../middleware/selfsigned');
// const loginRoute = require('./login')
passport.use(jwtStrategy);

// Matches with "/api/user"
router.route('/')
    .post(userController.create);

// Matches with "/api/user/:id"
router
    .route('/:id')
    .get(protected, userOwnsRecord, userController.findById)
    .put(protected, userOwnsRecord, userController.update);


module.exports = router;
