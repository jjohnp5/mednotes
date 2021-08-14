const {Patients, User, Visits} = require('../models/index');


module.exports = {
  findAll: async (req, res) => {
    try {
      const user = await User.findOne({_id: req.query.userId})
          .populate({
            path: 'patients',
            populate: {
              path: 'visits',
            },
          });
      res.status(200).json(user.patients);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findById: async (req, res) => {
    try {
      const patient = await Patients.findById(req.params.id).exec();
      return res.status(200).json(patient);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const body = {...req.body, user: req.query.userId};
      const patient = await Patients.create(body);
      const user = await User.findOneAndUpdate({_id: req.query.userId}, {$push: {patients: patient._id}}).exec();
      console.log(user);
      res.status(200).json(patient);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const patient = await Patients.findOneAndUpdate({_id: req.params.id}, req.body);
      res.status(200).json(patient);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const patient = await Patients.findById({_id: req.params.id});
      await Visits.deleteMany({patient: patient._id});
      await User.findOneAndUpdate({_id: req.query.userId}, {$pull: {patients: patient._id}}).exec();
      const removedPatient = await patient.remove();
      res.status(200).json(removedPatient);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};

