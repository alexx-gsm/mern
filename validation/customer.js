const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  // organisation's name
  data.name = !isEmpty(data.name) ? data.name : '';
  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Название организации от 2 до 50 символов';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Название организации обязательно';
  }

  // contact person name
  data.person = !isEmpty(data.person) ? data.person : '';
  if (!Validator.isLength(data.person, { min: 2, max: 50 })) {
    errors.person = 'Контактное лицо (ФИО) от 2 до 50 символов';
  }
  if (Validator.isEmpty(data.person)) {
    errors.person = 'Необходимо указать контактное лицо (ФИО)';
  }

  // contact phone
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Необходимо указать контактный телефон';
  }

  // email
  data.email = !isEmpty(data.email) ? data.email : '';
  // if (Validator.isEmpty(data.email)) {
  //   errors.email = 'Email field is required';
  // }
  if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
    errors.email = 'Укажите корректный e-mail или оставьте поле пустым';
  }

  // address
  data.address = !isEmpty(data.address) ? data.address : '';
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Необходимо указать адрес доставки';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
