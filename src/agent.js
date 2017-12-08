import axios from 'axios';


export const API_ROOT = 'https://conduit.productionready.io/api';
axios.defaults.baseURL = API_ROOT;

export let token = null;


export const responseBody = (response) => {
  return response;
};

export const setToken = (_token) => {
  token = _token;
  setAuthHeaders(token);
};

export const setAuthHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  }
};

export const requests = {
  get: (url) => {
    return axios.get(`${API_ROOT}${url}`).then(responseBody);
  },
  post: (url, body) => {
    return axios.post(`${API_ROOT}${url}`, body).then(responseBody);
  },
  put: (url, body) => {
    return axios.put(`${API_ROOT}${url}`, body).then(responseBody);
  }
};

export const Auth = {
  current: () => {
    return requests.get('/user');
  },
  login: (email, password) => {
    return requests.post('/users/login', { user: { email, password } });
  },
  register: (username, email, password) => {
    return requests.post('/users', { user: { username, email, password } });
  },
  save: (username, email, password) => {
    return requests.put('/user', { user: { username, email, password } });
  }
};


export default {
  Auth,
  setToken,
};
