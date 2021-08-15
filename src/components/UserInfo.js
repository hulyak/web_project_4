class UserInfo {
  constructor({ username, job }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      job: this._job.textContent,
    };
  }
  // takes new user data and adds it on the page
  setUserInfo() {
    this._username.textContent = this._username.name;
    this._job.textContent = this._job.name;
  }
}

export default UserInfo;
