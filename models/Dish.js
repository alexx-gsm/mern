const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  price2: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  structure: {
    type: String
  },
  images: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  components: [
    {
      component: {
        type: Schema.Types.ObjectId,
        ref: 'components'
      },
      amount: {
        type: String
      }
    }
  ],
  cost: {
    type: String
  }
});

module.exports = Dish = mongoose.model('dish', DishSchema);
