const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  template: [{
    type: Schema.Types.ObjectId, ref: 'Template',
  }],
  position: {type: Number, default: 1, enum: [1, 2, 3], required: true},
  addedDate: {type: Date, default: Date.now},
});

const User = mongoose.model('User', userSchema);


module.exports = User;
