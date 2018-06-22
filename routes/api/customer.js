const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Customer = require('../../models/Customer');

// Load Validations
const validateCustomerInput = require('../../validation/customer');

// @route   GET api/customer/test
// @desc    Test customer route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'customer Works' }));

// @route   POST api/customer
// @desc    Create customer
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCustomerInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const customerID = req.body._id || null;

    if (customerID) {
      const customerFields = {};

      customerFields.name = req.body.name;
      customerFields.person = req.body.person;
      customerFields.phone = req.body.phone;
      customerFields.email = req.body.email;
      customerFields.address = req.body.address;
      customerFields.note = req.body.note;

      Customer.findById(customerID).then(customer => {
        if (customer) {
          // Update Customer
          Customer.findByIdAndUpdate(
            customerID,
            { $set: customerFields },
            { new: true }
          )
            .then(customer => {
              res.json(customer);
            })
            .catch(err =>
              res
                .status(401)
                .json({ nocustomer: 'Нет такого customer', err: err })
            );
        }
      });
    } else {
      // Create new Customer
      const newCustomer = new Customer({
        name: req.body.name,
        person: req.body.person,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        note: req.body.note
      });

      // Save new Customer
      newCustomer.save().then(customer => res.json(customer));
    }
  }
);

// @route   POST api/customer/all
// @desc    Get all customers
// @access  Private
router.post(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Customer.find()
      .sort({ name: 1 })
      .then(customers => res.json(customers))
      .catch(err => res.status(404).json({ nodishes: 'Нету customers' }));
  }
);

// @route   POST api/customer/:id
// @desc    Get customer by id
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Customer.findById(req.params.id)
      .then(customer => res.json(customer))
      .catch(err => res.status(404).json({ nodish: 'Нет такого customer' }));
  }
);

// @route   DELETE api/customer/:id
// @desc    Delete customer by id
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role !== 'admin') {
      res.status(401).json({ noadmin: 'only admin can delete customer' });
    }

    Customer.findById(req.params.id)
      .then(customer => {
        // Delete
        customer.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ nodish: 'No customer found' }));
  }
);

module.exports = router;
