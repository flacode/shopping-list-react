import axios from 'axios/lib/axios';
// const BASE_URL = "https://deployment-shopping-list-api.herokuapp.com/api";
const BASE_URL = 'http://127.0.0.1:5000/api';
let token;
let url;

// function to register a user on the API
const registerUser = (user, success, message) => {
  url = `${BASE_URL}/auth/register`;
  console.log(url);
  axios.post(url, user)
    .then((response) => {
      success(response.data.message);
    })
    .catch((error) => {
      // handle API generated errors
      if (error.response) {
        message(error.response.data.message);
      } else {
        // handle network server errors
        message('Network error, please try again later');
      }
    });
};

const Client = { registerUser };

export default Client;
