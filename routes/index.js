const express = require('express');
const router = new express.Router();
const path = require('path');
const loginController = require('../controllers/loginController');
const userRoutes = require('./user');
const templateRoutes = require('./template');
const fieldRoutes = require('./fields');
const patientRoutes = require('./patient');
const visitRoutes = require('./visit');
const templateJunctionRoutes = require('./templateJunction');

router.post('/login', loginController);
router.use('/api/user', userRoutes);
router.use('/api/template', templateRoutes);
router.use('/api/field', fieldRoutes);
router.use('/api/patient', patientRoutes);
router.use('/api/visit', visitRoutes);
router.use('/api/junction', templateJunctionRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
