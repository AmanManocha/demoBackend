const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String},
  lastName: { type: String},
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  age: Number,
  city: String,
  pinCode: String,
  project: String,
  dateRange: {type: Object,Date},
  location: String,
  profession: String,
  experience: String,
  profilePhoto: String, // Store file path or URL
  documents: [String], // Store file paths or URLs
});

const User = mongoose.model('User', userSchema);

module.exports = User;
