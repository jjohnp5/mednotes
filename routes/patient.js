const express = require('express');
const router = new express.Router();
const patientController = require('../controllers/patient');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
const {userOwnsRecord} = require('../middleware/selfsigned');
// const loginRoute = require('./login')
passport.use(jwtStrategy);

// Matches with "/api/patient"
router.route('/')
    .get(protected, userOwnsRecord, patientController.findAll)
    .post(protected, userOwnsRecord, patientController.create);

router.route('/:id')
    .get(protected, userOwnsRecord, patientController.findById)
    .put(protected, userOwnsRecord, patientController.update)
    .delete(protected, userOwnsRecord, patientController.remove);

module.exports = router;
