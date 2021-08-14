const express = require('express');
const router = new express.Router();
const templateController = require('../controllers/template');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
const {userOwnsRecord} = require('../middleware/selfsigned');
// const loginRoute = require('./login')
passport.use(jwtStrategy);

// Matches with "/api/template"
router.route('/')
    .get(protected, userOwnsRecord, templateController.findAll)
    .post(protected, userOwnsRecord, templateController.create);

router.route('/:id')
    .get(protected, userOwnsRecord, templateController.findById)
    .put(protected, userOwnsRecord, templateController.update)
    .delete(protected, userOwnsRecord, templateController.remove);

module.exports = router;
