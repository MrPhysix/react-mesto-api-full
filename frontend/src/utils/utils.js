export const apiConfig = {
  baseUrl: 'https://api.mrphysix.yandex.nomoreparties.sbs',
  headers: {
    authorization: '2181393e-dcbd-4ec4-b795-5358ac072ebb',
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
