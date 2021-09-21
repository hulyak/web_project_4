class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => this._handleResponse(res)
    );
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  /**
   * Returns a Promise of type Response that waits for user information and card data from server
   * @returns Promise<Response>
   */
  getAppInfo() {
    return Promise.all([this.loadUserInfo(), this.getInitialCards()]);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    }).then((res) => this._handleResponse(res));
  }

  /**
   *Returns a Promise of type Response that yields user avatar
   * @param {String} avatar url of the user's profile
   * @returns Promise<Response>
   */
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then((res) => this._handleResponse(res));
  }

  /**
   * Returns a Promise of type Response that yields a
   * single card given an ID
   * @param {String} cardId that corresponds to a card
   * @returns Promise<Response>
   */
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => this._handleResponse(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._handleResponse(res));
  }

  addNewCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name: this.name, link: this.link }),
    }).then((res) => this._handleResponse(res));
  }
}

export default Api;
