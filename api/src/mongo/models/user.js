const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous"
  },
  uId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  // uses uId
  friends: {
    type: Array,
    default: []
  },

  // uses gId
  groups: {
    type: Array,
    default: []
  },

  lastSeen: {
    type: Date,
    required: True,
    default: Date.now
  }

});

module.exports = mongoose.model('User', userSchema);