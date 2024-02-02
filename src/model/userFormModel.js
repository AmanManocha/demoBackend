const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({

    age: Number,
    city: String,
    pinCode: String,
    project: String,
    dateRange: [Date],
    location: String,
    profession: String,
    experience: String,
    profilePhoto: String, // Store file path or URL
    documents: [String], // Store file paths or URLs
  });
  
  const FormData = mongoose.model('FormData', formDataSchema);

  module.exports = FormData;
