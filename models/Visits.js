const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitsSchmema = new Schema({
  patient: {type: Schema.Types.ObjectId, ref: 'Patient'},
  date: {type: Date, default: Date.now},
  reason: {type: String, required: true},
  notes: {type: String},
  notableInformation: {type: Map, of: 'String'},
});

const Visits = mongoose.model('Visits', visitsSchmema);

module.exports = Visits;
