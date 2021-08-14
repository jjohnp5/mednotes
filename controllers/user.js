const {User, Template} = require('../models/');
const bcrypt = require('bcrypt');

module.exports = {
  findAll: async (req, res) => {
    try {
      const UserModel = await User.find().sort({lastName: 1}).populate({
        path: 'template',
        populate: {
          path: 'fieldMaps',
        },
      });
      res.status(200).json(UserModel);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  findById: async (req, res) => {
    try {
      const User = await User.findById(req.params.id).populate({
        path: 'template',
        populate: {
          path: 'fieldMaps',
        },
      }).populate({path: 'patients', populate: {
        path: 'visits',
      }});
      res.status(200).json(User);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  create: (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      try {
        const user = await User.create({...req.body, password: hash});
        res.status(200).json(user);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  },
  update: async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findOneAndUpdate({_id: req.params.id}, req.body).exec();
      console.log(user);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await Template.remove({user: req.params.id});
      const removedUser = await user.remove();
      res.status(200).json(removedUser);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};
