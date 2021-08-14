const express = require('express');
const router = new express.Router();
const visitController = require('../controllers/visit');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
const {userOwnsRecord} = require('../middleware/selfsigned');
passport.use(jwtStrategy);

// Matches with "/api/visit"
router.route('/')
    .post(protected, userOwnsRecord, visitController.create);

// Matches with "/api/visit/:id"
router
    .route('/:id')
    .get(protected, userOwnsRecord, visitController.findById)
    .put(protected, userOwnsRecord, visitController.update)
    .delete(protected, userOwnsRecord, visitController.remove);

module.exports = router;
