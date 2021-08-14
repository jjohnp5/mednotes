const {TemplateField, TemplateFieldJunction} = require('../models/');

module.exports = {
  findById: async (req, res)=>{
    try {
      const field = await TemplateField.findById(req.params.id).exec();
      return res.status(200).json(field);
    } catch (e) {
      return res.status(422).json(e);
    }
  },
  findByTemplateId: async (req, res) => {
    try {
      const field = await TemplateField.find({template: req.params.templateId}).exec();
      return res.status(200).json(field);
    } catch (e) {
      return res.status(422).json(e);
    }
  },
  create: async (req, res) => {
    try {
      const field = await TemplateField.create({...req.body});
      const template = await TemplateFieldJunction.findOneAndUpdate({_id: field.templateJunction},
          {
            $push: {
              templateFields: field._id,
            },
          }).exec();
      console.log(template);
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
      await TemplateFieldJunction.findOneAndUpdate({_id: field.templateJunction}, {$pull: {templateFields: field._id}}).exec();
      const removedField = await field.remove();
      res.status(200).json(removedField);
    } catch (e) {
      res.status(422).json(err);
    }
  },
};

