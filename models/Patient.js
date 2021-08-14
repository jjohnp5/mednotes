const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  template: {type: Schema.Types.ObjectId, ref: 'Template'},
  visits: [{
    type: Schema.Types.ObjectId, ref: 'Visits',
  }],
  addedDate: {type: Date, default: Date.now},
});

const Patient = mongoose.model('Patient', patientSchema);


module.exports = Patient;
