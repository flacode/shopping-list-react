import axios from 'axios/lib/axios';
// const BASE_URL = "https://deployment-shopping-list-api.herokuapp.com/api";
const BASE_URL = 'http://127.0.0.1:5000/api';
let token = null;
let url;

const handleError = (error, message) => {
  // handle API generated errors
  if (error.response) {
    message(error.response.data.message);
  } else {
    // handle network server errors
    message('Network error, please try again later');
  }
};

// function to register a user on the API
const registerUser = (user, success, message) => {
  url = `${BASE_URL}/auth/register`;
  axios.post(url, user)
    .then(response => success(response.data.message))
    .catch(error => handleError(error, message));
};

// API call to login user and get authentication token.
const loginUser = (user, success, message) => {
  url = `${BASE_URL}/auth/login`;
  axios.post(url, user)
    .then((response) => {
      token = response.data.access_token;
      localStorage.setItem('loggedIn', true);
      return success(response.data.message);
    })
    .catch(error => handleError(error, message));
};

const Client = { registerUser, loginUser };

export default Client;
