const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateFieldSchema = new Schema({
  name: {type: String, required: true},
  value: {type: String, required: true},
  template: {type: Schema.Types.ObjectId, ref: 'Template'},
  templateJunction: {type: Schema.Types.ObjectId, ref: 'TemplateFieldJunction'},
  sortOrder: {type: Number, required: true},
});

const TemplateField = mongoose.model('TemplateField', templateFieldSchema);

module.exports = TemplateField;
