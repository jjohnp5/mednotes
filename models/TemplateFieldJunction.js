const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateFieldJunctionSchema = new Schema({
  name: {type: String, required: true},
  template: {type: Schema.Types.ObjectId, required: true},
  templateFields: [{type: Schema.Types.ObjectId, ref: 'TemplateField'}],
});

const TemplateFieldJunction = mongoose.model('TemplateFieldJunction', templateFieldJunctionSchema);

module.exports = TemplateFieldJunction;
