const express = require('express');
const router = new express.Router();
const templateFieldJunction = require('../controllers/templateFieldJunction');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
const {userOwnsRecord} = require('../middleware/selfsigned');
passport.use(jwtStrategy);

// Matches with "/api/junction"
router.route('/')
    .post(protected, userOwnsRecord, templateFieldJunction.create);

// Matches with "/api/junction/:id"
router
    .route('/:id')
    .get(protected, userOwnsRecord, templateFieldJunction.findById)
    .put(protected, userOwnsRecord, templateFieldJunction.update)
    .delete(protected, userOwnsRecord, templateFieldJunction.remove);

module.exports = router;
