const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  businessInterests: [String],
  skills: [String],
  profilePicture: String,
  portfolio: String,
});

module.exports = mongoose.model('User', UserSchema);
