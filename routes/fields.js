const express = require('express');
const router = new express.Router();
const fieldController = require('../controllers/templateField');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
passport.use(jwtStrategy);

// Matches with "/api/punch"
router.route('/')
    .post(protected, fieldController.create);

// Matches with "/api/punch/:id"
router
    .route('/:id')
    .get(protected, fieldController.findById)
    .put(protected, fieldController.update)
    .delete(protected, fieldController.remove);

module.exports = router;
