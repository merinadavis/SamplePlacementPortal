const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'admin'],
    default: 'student'
  }
})

module.exports = User = mongoose.model('user', UserSchema)
