const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = 'Название блюда от 10 до 50 символов';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Название обязательно';
  }

  // TODO: all reqirued field validation

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
