const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Dish = require('../../models/Dish');

// Load Validations
const validateDishInput = require('../../validation/dish');

// @route   GET api/dishes/test
// @desc    Test dishes route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Dishes Works' }));

// @route   POST api/dishes
// @desc    Create dish
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateDishInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newDish = new Dish({
      name: req.body.name,
      weight: req.body.weight,
      price: req.body.price,
      price2: req.body.price2,
      desc: req.body.desc,
      structure: req.body.structure,
      category: req.body.category
    });

    newDish.save().then(dish => res.json(dish));
  }
);

// @route   GET api/dishes
// @desc    Get dishes
// @access  Public
router.get('/', (req, res) => {
  Dish.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(404).json({ nodishes: 'Нету блюд' }));
});

// @route   GET api/dishes/:id
// @desc    Get dish by id
// @access  Public
router.get('/:id', (req, res) => {
  Dish.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ nodish: 'Нет такого блюда' }));
});

// @route   DELETE api/dishes/:id
// @desc    Delete dish by id
// @access  Privite
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role !== 'admin') {
      res.status(401).json({ noadmin: 'only admin can delete dish' });
    }

    Dish.findById(req.params.id)
      .then(item => {
        // Delete
        item.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ nodish: 'No dish found' }));
  }
);

module.exports = router;
