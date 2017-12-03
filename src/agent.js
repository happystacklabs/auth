import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';


const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = (res) => {
  return res.body;
};

const requests = {
  get: (url) => {
    return superagent.get(`${API_ROOT}${url}`).then(responseBody);
  },
  post: (url, body) => {
    return superagent.post(`${API_ROOT}${url}`, body).then(responseBody);
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
