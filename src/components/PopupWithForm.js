import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ handleSubmit, popupSelector }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    const form = document.querySelector(".popup__form ");
    this._formElement = form;
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
