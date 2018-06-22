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
      dish_id: {
        type: Schema.Types.ObjectId,
        ref: 'dishes'
      },
      is_ready: {
        type: Boolean,
        default: false
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
  },
  date: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
