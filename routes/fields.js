const express = require('express');
const router = new express.Router();
const fieldController = require('../controllers/templateField');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
const {userOwnsRecord} = require('../middleware/selfsigned');
passport.use(jwtStrategy);

// Matches with "/api/field"
router.route('/')
    .post(protected, userOwnsRecord, fieldController.create);

router.route('/template/:templateId')
    .get(protected, userOwnsRecord, fieldController.findByTemplateId);

// Matches with "/api/field/:id"
router
    .route('/:id')
    .get(protected, userOwnsRecord, fieldController.findById)
    .put(protected, userOwnsRecord, fieldController.update)
    .delete(protected, userOwnsRecord, fieldController.remove);

module.exports = router;
