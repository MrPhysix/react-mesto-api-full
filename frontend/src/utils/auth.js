const { BASE_URL } = require('./constants');

function checkResult(res) {
  if (res.ok && res.status !== 400 && res.status !== 401) {
    return res.json();
  }
  return console.log(res);// Promise.reject(`Ошибка: ${res.status}`);
}

export const signUp = (password, email) => {
  console.log('sign up');
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => console.log(`signUp err ${err}`));
};
export const signIn = (password, email, setInfoTooltip) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => checkResult(res))
  .then((data) => {
    if (data.token) {
      console.log(`signIn data token ${data.token}`);
      localStorage.setItem('jwt', data.token);
     // document.cookie = `jwt=${data.token}`;
      return data;
    }
  })
  .catch((err) => console.log(`signIn err ${err}`));

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${token}`,
  },
})
  .then((res) => checkResult(res))
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(`checkToken err ${err}`));

// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//     .then(res => res.json())
//     .then(data => data)
// }
