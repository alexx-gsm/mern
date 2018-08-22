const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');

// Load Models
const Payment = require('../../models/Payment');

// Load Validations
// const validateDishInput = require('../../validation/dish');

// @route   GET api/payments/test
// @desc    Test payments route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Payments Works' }));

// @route   POST api/payments
// @desc    Create payment
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newPayment = new Payment({
      date: req.body.date,
      week: req.body.week,
      title: req.body.title,
      type: req.body.type,
      cash: req.body.cash,
      card: req.body.card,
      comment: req.body.comment,
      user: req.user.id
    });

    newPayment.save().then(item => res.json(item));
  }
);

// @route   POST api/payments/all
// @desc    Get all payments
// @access  Private
router.post(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Payment.find()
      .sort({ date: -1 })
      .then(payments => res.json(payments))
      .catch(err => res.status(404).json({ nopayments: 'Нет движухи', err }));
  }
);

// @route   POST api/payments/week/:num
// @desc    Get all payments in $num week
// @access  Private
router.post(
  '/week/:num',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Payment.find({ week: req.params.num })
      .sort({ date: -1 })
      .then(payments => res.json(payments))
      .catch(err => res.status(404).json({ nopayments: 'Нет движухи', err }));
  }
);

// @route   POST api/payments/day
// @desc    Get all payments in day
// @access  Private
router.post(
  '/day',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const day = req.body.day;
    const selectedDay = moment(day)
      .startOf('day')
      .toDate();

    const selectedNextDay = moment(day)
      .startOf('day')
      .add(1, 'd')
      .toDate();
    // res.json({ ok: 'ok' });
    Payment.find({
      date: {
        $gte: selectedDay,
        $lt: selectedNextDay
      }
    })
      .sort({ date: -1 })
      .then(payments => res.json(payments))
      .catch(err => res.status(404).json({ nopayments: 'Нет движухи', err }));
  }
);

// @route   POST api/payments/count
// @desc    Get payment count in the same day
// @access  Private
router.post(
  '/count',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const day = req.body.day;
    const selectedDay = moment(day)
      .startOf('day')
      .toDate();

    const selectedNextDay = moment(day)
      .startOf('day')
      .add(1, 'd')
      .toDate();

    Payment.find({
      date: {
        $gte: selectedDay,
        $lt: selectedNextDay
      }
    })
      .then(count => res.json(count.length))
      .catch(err => res.status(404).json({ nopayments: 'Нет движухи', err }));
  }
);

// @route   POST api/payments/:id
// @desc    Get payment by id
// @access  Public
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Payment.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(404).json({ nopayment: 'Нет такого чека' }));
  }
);

// @route   PUT api/payments
// @desc    Update payment by id
// @access  Private
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const paymentID = req.body._id;
    if (paymentID) {
      Payment.findById(paymentID)
        .then(payment => {
          if (payment) {
            const paymentFields = {
              date: req.body.date,
              week: req.body.week,
              title: req.body.title,
              type: req.body.type,
              cash: req.body.cash,
              card: req.body.card,
              comment: req.body.comment,
              user: req.user.id
            };
            Payment.findByIdAndUpdate(
              paymentID,
              { $set: paymentFields },
              { new: true }
            )
              .then(payment => {
                console.log(payment);
                res.json(payment);
              })
              .catch(err =>
                res.status(401).json({ errupdate: 'payment not found' })
              );
          }
        })
        .catch(err => res.status(401).json({ errupdate: 'payment not found' }));
    }
  }
);

// @route   DELETE api/payments/:id
// @desc    Delete payment by id
// @access  Privite
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role !== 'admin') {
      res.status(401).json({ noadmin: 'only admin can delete dish' });
    }

    Payment.findById(req.params.id)
      .then(item => {
        // Delete
        item.remove().then(item => res.json(item));
      })
      .catch(err => res.status(404).json({ nodish: 'No dish found' }));
  }
);

module.exports = router;
