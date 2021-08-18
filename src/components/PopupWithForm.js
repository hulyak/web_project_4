import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".popup__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
