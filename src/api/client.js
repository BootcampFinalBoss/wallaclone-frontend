import axios from 'axios';

const {
  REACT_APP_API_HOST: host,
  REACT_APP_API_VERSION: version,
} = process.env;
const baseURL = version ? `${host}/${version}` : `${host}`;

// Create axios instance
const client = axios.create({
  baseURL,
});

export const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

// Login method
client.login = (credentials) => {
  return client.post('/user/login', credentials).then((auth) => {
    // Set Authorization header for future requests
    setAuthorizationHeader(auth.data.token, auth.data.username);
    return auth.data;
  });
};

client.register = (data) =>
  client.post('/user/', data).then((res) => {
    console.log(res, res.status);
    return res;
  });

// Logout method
client.logout = () =>
  new Promise((resolve) => {
    // Remove Authorization header
    removeAuthorizationHeader();
    resolve();
  });

/*client.forgot = (data) => {
  client.post("/user/forgot-password", data).then((response) => {
    return response;
  });
};*/

// TODO: Backend needs to improve the response
// Intercepts response
// client.interceptors.response.use(
//   ({ data: { ok, ...result } }) => {
//     if (!ok) {
//       return Promise.reject(result.error);
//     }
//     return Promise.resolve(result);
//   },
//   (error) => {
//     if (error.response) {
//       return Promise.reject(error.response.data.error);
//     }
//     return Promise.reject(error);
//   },
// );

// Configure client
export const configureClient = (token) => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export default client;
