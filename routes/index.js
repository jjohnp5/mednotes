const express = require('express');
const router = new express.Router();
const path = require('path');
const loginController = require('../controllers/loginController');
const userController = require('./user');
const templatController = require('./template');
const fieldController = require('./fields');

router.use('/login', loginController);
router.use('/api/user', userController);
router.use('/api/template', templatController);
router.use('/api/field', fieldController);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
