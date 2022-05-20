import { apiConfig } from './utils';

class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this.jwt = localStorage.getItem('jwt');
  }

  // eslint-disable-next-line class-methods-use-this
  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getToken(){
    this.jwt = localStorage.getItem('jwt');
  }

  _getHeaders(){
    return {
        ...this._headers,
        'Authorization': `${this.jwt}`,
      }
  }

  async getInitialCards() {
    await this._getToken();
      return fetch(`${this._url}/cards`, {
        headers: this._getHeaders(),
      }).then((res) => this._checkResult(res));
  }

  async getUserInfo() {
    await this._getToken();
      return fetch(`${this._url}/users/me`, {
        headers: this._getHeaders(),
      })
        .then((res) => this._checkResult(res))
        .catch(err => console.log(err));
    }

  async setUserInfo(info) {
    await this._getToken();
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: info.name,
        about: info.about,
        email: info.email,
      }),
    }).then((res) => this._checkResult(res));
  }

  async addCard(data) {
    await this._getToken();
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResult(res));
  }

  async removeItem(id) {
    await this._getToken();
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then((res) => this._checkResult(res));
  }

  async likeHandler(id, status) {
    await this._getToken();
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: status ? 'PUT' : 'DELETE',
      headers: this._getHeaders(),
    }).then((res) => this._checkResult(res));
  }

  async changeUserAvatar(picture) {
    await this._getToken();
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: picture,
      }),
    }).then((res) => this._checkResult(res));
  }
}

const api = new Api(apiConfig);
export default api;
