const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Order = require('../../models/Order');
const Customer = require('../../models/Customer');

// Load Validations
// const validatePostInput = require('../../validation/post');
// const validateCommentInput = require('../../validation/comment');
// const validateOrderInput = require('../../validation/order');

// @route   GET api/orders/test
// @desc    Test orders route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Order Works' }));

// @route   POST api/orders
// @desc    Create order
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateOrderInput(req.body);
    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newOrder = new Order({
      customer: req.body.customer,
      dishes: req.body.dishes,
      total: req.body.total,
      courier: req.user.id,
      comment: req.body.comment
    });

    newOrder.save().then(order => res.json(order));
  }
);

// @route   POST api/orders/all
// @desc    Get all orders
// @access  Private
router.post(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Order.find()
      .sort({ name: 1 })
      .then(orders => res.json(orders))
      .catch(err => res.status(404).json({ nodishes: 'Нет заказов' }));
  }
);

// @route   POST api/orders/all/:date
// @desc    Get filtered orders
// @access  Private
router.post(
  '/all/:date',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('--date', req.params.date);
    console.log('--filter', req.body.filter);

    const { year, month, date } = req.body.filter;

    const x = new Date(year, month, date);

    console.log('--Date', x.toString());
    Order.find({
      date: {
        $gte: new Date(year, month, date),
        $lt: new Date(year, month, date + 1)
      }
    })
      .sort({ name: 1 })
      .then(orders => res.json(orders))
      .catch(err => res.status(404).json({ nodishes: 'Нет заказов' }));
  }
);

// @route   POST api/orders/:id
// @desc    Get order by id
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Order.findById(req.params.id)
      .then(orders => res.json(orders))
      .catch(err => res.status(404).json({ nodish: 'Нет такого заказа' }));
  }
);

// @route   PUT api/orders/:id
// @desc    Save order by id
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const orderID = req.params.id;
    if (orderID) {
      Order.findById(orderID)
        .then(order => {
          if (order) {
            // Update Order
            const orderFields = {
              customer: req.body.customer,
              dishes: req.body.dishes,
              status: req.body.status,
              total: req.body.total,
              courier: req.user.id,
              update: Date.now(),
              comment: req.body.comment
            };
            Order.findByIdAndUpdate(
              orderID,
              { $set: orderFields },
              { new: true }
            )
              .then(order => res.json(order))
              .catch(err =>
                res.status(401).json({ noorder: 'Нет такого order', err: err })
              );
          }
        })
        .catch(err => res.status(404).json({ nodish: 'Нет такого заказа' }));
    }
  }
);

// @route   PUT api/orders/status/:id
// @desc    Set order status
// @access  Private
router.put(
  '/status/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const orderID = req.params.id;

    if (orderID) {
      Order.findById(orderID)
        .then(order => {
          if (order) {
            // Update Order
            const orderFields = {
              update: Date.now(),
              status: req.body.status
            };
            Order.findByIdAndUpdate(
              orderID,
              { $set: orderFields },
              { new: false }
            )
              .then(order => res.json(order))
              .catch(err =>
                res.status(401).json({ noorder: 'Нет такого order', err: err })
              );
          }
        })
        .catch(err => res.status(404).json({ nodish: 'Нет такого заказа' }));
    }
  }
);

// @route   PUT api/orders/order/:order_id/dish/:dish_id
// @desc    Set order status
// @access  Private
// router.put(
//   '/order/:order_id/dish/:dish_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const orderID = req.params.order_id;
//     const dishID = req.params.dish_id;
//     const is_ready = req.body.is_ready;

//     console.log(orderID, dishID, is_ready);

//     if (orderID && dishID) {
//       Order.findById(orderID)
//         .then(order => {
//           if (order) {
//             // Update Order
//             const orderFields = {
//               update: Date.now(),
//               dishes: [
//                 ...order.dishes.map(dish => {
//                   if (dish.dish_id == dishID) {
//                     console.log('+++');
//                     const { is_ready, ...rest } = dish;

//                     console.log(is_ready, rest);

//                     return dish;
//                   }

//                   console.log('---dish', dish);

//                   return dish;
//                 })
//               ]
//             };
//             // console.log(order.dishes);
//             console.log(orderFields);

//             Order.findByIdAndUpdate(
//               orderID,
//               { $set: orderFields },
//               { new: false }
//             )
//               .then(order => res.json(order))
//               .catch(err =>
//                 res.status(401).json({ noorder: 'Нет такого order', err: err })
//               );
//           }
//         })
//         .catch(err => res.status(404).json({ nodish: 'Нет такого заказа' }));
//     }
//   }
// );

// @route   DELETE api/orders/:id
// @desc    Delete order by id
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role !== 'admin') {
      res.status(401).json({ noadmin: 'only admin can delete order' });
    } else {
      // We are ADMIN and can delete order
      Order.findById(req.params.id)
        .then(order => {
          // Delete
          order.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ noorder: 'No order found' }));
    }
  }
);

module.exports = router;
