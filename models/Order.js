const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create OrderSchema
const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customers'
  },
  dishes: [
    {
      dish: {
        type: Schema.Types.ObjectId,
        ref: 'dishes'
      },
      amount: {
        type: String,
        default: 1
      }
    }
  ],
  total: {
    type: String
  },
  courier: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    default: 'Draft'
  },
  payment: {
    type: String,
    default: 'not paid'
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
