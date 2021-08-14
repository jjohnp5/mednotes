const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  fieldMaps: [{
    type: Schema.Types.ObjectId, ref: 'TemplateFieldJunction',
  }],
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
