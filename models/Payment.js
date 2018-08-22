const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
  date: { type: Date, default: Date.now },
  week: { type: String, required: true },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },

  cash: {
    type: Number,
    default: 0
  },
  card: {
    type: Number,
    default: 0
  },

  comment: {
    type: String
  },

  // author of doc
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = Payment = mongoose.model('payment', PaymentSchema);
