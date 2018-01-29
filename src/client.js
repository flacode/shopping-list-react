import axios from 'axios/lib/axios';
import { notify } from 'react-notify-toast';

// const BASE_URL = 'https://deployment-shopping-list-api.herokuapp.com/api';
const BASE_URL = 'http://127.0.0.1:5000/api';
let token = null;
let url;

const handleError = (error, errorMessage) => {
  // handle API generated errors
  if (error.response) {
    if (error.response.status === 401) {
      token = null;
      localStorage.removeItem('token');
    }
    errorMessage(error.response.data.message);
  } else {
    // handle network server errors
    errorMessage('Network error, please try again later');
  }
};

// function to register a user on the API
const registerUser = (user, successMessage, errorMessage) => {
  url = `${BASE_URL}/auth/register`;
  axios.post(url, user)
    .then(response => successMessage(response.data.message))
    .catch(error => handleError(error, errorMessage));
};

// API call to login user and get authentication token.
const loginUser = (user, successMessage, ErrorMessage) => {
  url = `${BASE_URL}/auth/login`;
  axios.post(url, user)
    .then((response) => {
      token = response.data.access_token;
      localStorage.setItem('token', token);

      // update localStorage for logged in user
      return successMessage(response.data.message);
    })
    .catch(error => handleError(error, ErrorMessage));
};

// API call to return shopping lists from the server
const getShoppingLists = (success, message) => {
  url = `${BASE_URL}/shoppinglists/`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.get(url, config)
    .then(response => success(response.data))
    .catch(error => handleError(error, message));
};

// API call to create shopping list
const createShoppingList = (shoppingList, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.post(url, shoppingList, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

const deleteShoppingList = (shoppingListId, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${shoppingListId}`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.delete(url, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

const updateShoppingList = (shoppingListId, shoppingList, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${shoppingListId}`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.put(url, shoppingList, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

const isLoggedIn = () => {
  if (localStorage.getItem('token')) return true;
  return false;
};

const Client = {
  registerUser,
  loginUser,
  getShoppingLists,
  createShoppingList,
  deleteShoppingList,
  updateShoppingList,
  isLoggedIn,
};

export default Client;
