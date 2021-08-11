const {User} = require('../models/User');
const Template = require('../models/Template');
const jwt = require('jsonwebtoken');


module.exports = {
  findAll: async (req, res) => {
    try {
      const user = await User.findOne({_id: req.params.id})
          .populate({
            path: 'template',
            populate: {
              path: 'fields',
            },
          });
      res.status(200).json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findById: async (req, res) => {
    const currentUser = jwt.verify(req.headers.authorization.split(' ')[1], 'timeismoney');
    if (parseInt(req.params.id) === currentUser._id) {
      try {
        const user = await User.findOne({_id: req.params.id}).populate(
            {
              path: 'template',
              populate: {
                path: 'fields',
              },
            });
        if (user.template && user.template.length > 0) {
          res.status(200).json(user.template);
        } else {
          res.status(200).json([]);
        }
      } catch (err) {
        res.status(422).json(err);
      }
    } else {
      res.status(401).json({message: 'You are unauthorized to access this resource'});
    }
  },
  create: async (req, res) => {
    try {
      const template = await Template.create(req.body.template);
      await User.findOneAndUpdate({_id: req.params.userid}, {$push: {template: timesheet._id}});
      res.status(200).json(template);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const template = await Template.findOneAndUpdate({_id: req.params.id}, req.body);
      res.status(200).json(template);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const template = await Template.findById({_id: req.params.id});
      const removedTemplate = await template.remove();
      res.status(200).json(removedTemplate);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};

