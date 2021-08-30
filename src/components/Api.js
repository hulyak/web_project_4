class Api {
  constructor({ baseUrl, headers, cardId }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._cardId = cardId;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      }
    );
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default Api;
