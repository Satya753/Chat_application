const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  gId: {
    type: String,
    required: true,
  },

  groupId: {
    type: String,
    default: "Anonymous"
  },

  // uses uId
  users: {
    type: Array,
    default: []
  },
});

module.exports = mongoose.model('Group', groupSchema);