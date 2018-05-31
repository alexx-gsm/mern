const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Order = require('../../models/Order');
const Customer = require('../../models/Customer');

// Load Validations
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

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
    // const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newOrder = new Order({
      customer: req.body.customer,
      dishes: req.body.dishes,
      total: req.body.total,
      courier: req.user.id,
      status: req.body.status,
      payment: req.body.payment
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

// @route   DELETE api/orders/:id
// @desc    Delete order by id
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role !== 'admin') {
      res.status(401).json({ noadmin: 'only admin can delete order' });
    }

    Order.findById(req.params.id)
      .then(order => {
        // Delete
        order.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ noorder: 'No order found' }));
  }
);

module.exports = router;
