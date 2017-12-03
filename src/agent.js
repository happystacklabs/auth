import axios from 'axios';


export const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = (response) => {
  return response;
};

const requests = {
  get: (url) => {
    return axios.get(`${API_ROOT}${url}`).then(responseBody);
  },
  post: (url, body) => {
    return axios.post(`${API_ROOT}${url}`, body).then(responseBody);
  },
};

const Auth = {
  login: (email, password) => {
    return requests.post('/users/login', { user: { email, password } });
  },
};


export default {
  Auth,
};
