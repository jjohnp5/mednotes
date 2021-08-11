const TemplateField = require('../models/TemplateField');
const Template = require('../models/Template');

module.exports = {
  findById: async (req, res)=>{
    try {
      const field = await TemplateField.findById(req.params.id).exec();
      return res.status(200).json(field);
    } catch (e) {
      return res.status(422).json(e);
    }
  },
  create: async (req, res) => {
    try {
      const field = await TemplateField.create({...req.body.field});
      await Template.findOneAndUpdate({_id: req.body._id}, {$push: {fields: field._id}}).exec();
      res.status(200).json(field);
    } catch (e) {
      res.status(422).json(e);
    }
  },
  update: async (req, res) => {
    try {
      const field = await TemplateField.findOneAndUpdate({_id: req.params.id}, req.body);
      res.status(200).json(field);
    } catch (e) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const field = await TemplateField.findById({_id: req.params.id});
      const removedField = await field.remove();
      res.status(200).json(removedField);
    } catch (e) {
      res.status(422).json(err);
    }
  },
};

