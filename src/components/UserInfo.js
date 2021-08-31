class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  // takes new user data and adds it on the page
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

export default UserInfo;
