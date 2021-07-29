class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _showInputError(
    formElement,
    inputElement,
    { errorClass, inputErrorClass, ...rest }
  ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(
    formElement,
    inputElement,
    { errorClass, inputErrorClass, ...rest }
  ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement, rest) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, rest);
    } else {
      hideInputError(formElement, inputElement, rest);
    }
  }

  _hasInvalidInput(inputList) {
    inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(
    inputList,
    buttonElement,
    { inactiveButtonClass, ...rest }
  ) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    ...rest
  }) {
    const formList = [...document.querySelectorAll(formSelector)];

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

      const inputList = [...formElement.querySelectorAll(inputSelector)];
      const buttonElement = formElement.querySelector(submitButtonSelector);

      toggleButtonState(inputList, buttonElement, rest);
      // validate all inputs
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          checkInputValidity(formElement, inputElement, rest);
          // check whenever any field's input is changed
          toggleButtonState(inputList, buttonElement, rest);
        });
      });
    });
  }
}

const validateForm = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_visible",
  },
  form
);
export default FormValidator;
