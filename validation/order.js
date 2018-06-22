const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrderInput(data) {
  let errors = {};

  data.customer = !isEmpty(data.customer) ? data.customer : '';

  if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = 'Название блюда от 10 до 50 символов';
  }

  if (Validator.isEmpty(data.customer)) {
    errors.name = 'Select customer';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
