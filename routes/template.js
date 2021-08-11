const express = require('express');
const router = new express.Router();
const templateController = require('../controllers/template');
const passport = require('passport');
const {protected, jwtStrategy} = require('../middleware/jwt');
// const loginRoute = require('./login')
passport.use(jwtStrategy);

// Matches with "/api/template"
router.route('/')
    .post(protected, templateController.create);

router.route('/:id')
    .get(protected, templateController.findById)
    .put(protected, templateController.update)
    .delete(protected, templateController.remove);

module.exports = router;
