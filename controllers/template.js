const {Template, User, TemplateField, TemplateFieldJunction} = require('../models/index');


module.exports = {
  findAll: async (req, res) => {
    try {
      const user = await User.findOne({_id: req.query.userId})
          .populate({
            path: 'template',
            populate: {
              path: 'fieldMaps',
            },
          });
      res.status(200).json(user.template);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findById: async (req, res) => {
    try {
      const template = await Template.findById(req.params.id).exec();
      return res.status(200).json(template);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const body = {...req.body, user: req.query.userId};
      const template = await Template.create(body);
      await User.findOneAndUpdate({_id: req.query.userId}, {$push: {template: template._id}}).exec();
      res.status(200).json(template);
    } catch (err) {
      console.log(err);
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
      await TemplateField.deleteMany({template: template._id});
      await TemplateFieldJunction.deleteMany({template: template._id});
      await User.findOneAndUpdate({_id: req.query.userId}, {$pull: {template: template._id}}).exec();
      const removedTemplate = await template.remove();
      res.status(200).json(removedTemplate);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};

