import axios from 'axios';


require('dotenv').config();


export const API_ROOT = process.env.NODE_ENV === 'production' ? 'http://boilerplate-api.happystack.io/api' : 'http://localhost:3001/api';
axios.defaults.baseURL = API_ROOT;


// eslint-disable-next-line import/no-mutable-exports
export let token = null;


export const responseBody = response => response;


export const setAuthHeaders = () => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Token ${token}`;
  }
};


export const setToken = (_token) => {
  token = _token;
  setAuthHeaders();
};


export const requests = {
  get: url => axios.get(`${API_ROOT}${url}`).then(responseBody),
  post: (url, body) => axios.post(`${API_ROOT}${url}`, body).then(responseBody),
  put: (url, body) => axios.put(`${API_ROOT}${url}`, body).then(responseBody),
};


export const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: (username, email, password) => {
    const user = { username, email, password };
    if (!user.password) {
      delete user.password;
    }
    return requests.put('/user', { user });
  },
};


export default {
  Auth,
  setToken,
};
