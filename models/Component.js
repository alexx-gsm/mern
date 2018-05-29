const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ComponentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Component = mongoose.model('component', ComponentSchema);
