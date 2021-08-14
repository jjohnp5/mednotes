const {Visits, Patients} = require('../models/');

module.exports = {
  findById: async (req, res)=>{
    try {
      const visit = await Visits.findById(req.params.id).exec();
      return res.status(200).json(visit);
    } catch (e) {
      return res.status(422).json(e);
    }
  },
  create: async (req, res) => {
    try {
      const visit = await Visits.create({...req.body});
      await Patients.findOneAndUpdate({_id: req.body.patient}, {$push: {visits: visit._id}}).exec();
      res.status(200).json(visit);
    } catch (e) {
      res.status(422).json(e);
    }
  },
  update: async (req, res) => {
    try {
      const visit = await Visits.findOneAndUpdate({_id: req.params.id}, req.body);
      res.status(200).json(visit);
    } catch (e) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const visit = await Visits.findById({_id: req.params.id});
      await Patients.findOneAndUpdate({_id: visit.patient}, {$pull: {visits: visit._id}}).exec();
      const removedField = await visit.remove();
      res.status(200).json(removedField);
    } catch (e) {
      res.status(422).json(err);
    }
  },
};

