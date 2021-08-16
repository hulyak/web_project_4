class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      job: this._job.textContent,
    };
  }
  // takes new user data and adds it on the page
  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}

export default UserInfo;
