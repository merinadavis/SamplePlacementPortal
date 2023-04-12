const mongoose = require('mongoose')
//const User = require('./user');

// Create Schema
const AdminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

//const Admin = User.discriminator('Admin', AdminSchema);

module.exports = mongoose.model('Admin', AdminSchema)
