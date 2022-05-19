const jwt = localStorage.getItem('jwt');
const { BASE_URL } = require('./constants');

export const apiConfig = {
  baseUrl: BASE_URL,
  headers: {
    'Authorization': `${jwt}`,
    'Content-Type': 'application/json',
  },
};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
