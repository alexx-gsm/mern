const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create CustomerSchema
const CustomerSchema = new Schema({
  name: {
    type: String,
    default: 'ч/л'
  },
  person: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
