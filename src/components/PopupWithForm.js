import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }
  _getInputValues() {
    const profileName = document.querySelector(".popup__input_type_name");
    const profileJob = document.querySelector(".popup__input_type_job");
    const [name, job] = [profileName.value, profileJob.value];
    return { name, job };
  }

  _setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
