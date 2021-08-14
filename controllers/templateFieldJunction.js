const {Template, TemplateFieldJunction} = require('../models/');

module.exports = {
  findById: async (req, res)=>{
    try {
      const junction = await TemplateFieldJunction.findById(req.params.id).populate({
        path: 'templateFields',
      }).exec();
      return res.status(200).json(junction);
    } catch (e) {
      return res.status(422).json(e);
    }
  },
  create: async (req, res) => {
    try {
      const junction = await TemplateFieldJunction.create({...req.body});
      const template = await Template.findOneAndUpdate({_id: junction.template},
          {
            $push: {
              fieldMaps: junction._id},
          },
      ).exec();
      console.log(template);
      res.status(200).json(junction);
    } catch (e) {
      res.status(422).json(e);
    }
  },
  update: async (req, res) => {
    try {
      const junction = await TemplateFieldJunction.findOneAndUpdate({_id: req.params.id}, req.body).populate({
        path: 'templateFields',
      }).exec();
      res.status(200).json(junction);
    } catch (e) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const junction = await TemplateFieldJunction.findById({_id: req.params.id});
      await Template.findOneAndUpdate({_id: junction.template}, {$pull: {fields: junction._id}}).exec();
      const removedField = await junction.remove();
      res.status(200).json(removedField);
    } catch (e) {
      res.status(422).json(err);
    }
  },
};

