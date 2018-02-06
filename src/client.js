import axios from 'axios/lib/axios';
import { notify } from 'react-notify-toast';

const BASE_URL = 'https://deployment-shopping-list-api.herokuapp.com/api';
// const BASE_URL = 'http://127.0.0.1:5000/api';
let url;

const handleError = (error, errorMessage) => {
  // handle API generated errors
  if (error.response) {
    if (error.response.status === 401) {
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
const loginUser = (user, successMessage, errorMessage) => {
  url = `${BASE_URL}/auth/login`;
  axios.post(url, user)
    .then((response) => {
      localStorage.setItem('token', response.data.access_token);

      // update localStorage for logged in user
      return successMessage(response.data.message);
    })
    .catch(error => handleError(error, errorMessage));
};

// API call to return shopping lists from the server
const getShoppingLists = (success, message, perPage, pageNo, searchKey) => {
  if (searchKey) url = `${BASE_URL}/shoppinglists/?q=${searchKey}&limit=${perPage}&page=${pageNo}`;
  else url = `${BASE_URL}/shoppinglists/?limit=${perPage}&page=${pageNo}`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios.get(url, config)
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

// API call to delete shopping list
const deleteShoppingList = (shoppingListId, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${shoppingListId}`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.delete(url, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

// API call to update shopping list
const updateShoppingList = (shoppingListId, shoppingList, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${shoppingListId}`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.put(url, shoppingList, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

// API call to get shopping list items
const getItems = (shoppingListId, successMessage, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${shoppingListId}/items/`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios.get(url, config)
    .then(response => successMessage(response.data))
    .catch(error => handleError(error, errorMessage));
};

// API call to add items to shopping list
const addItems = (listId, item, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${listId}/items/`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.post(url, item, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

// TODO: API call delete items from shopping list
const deleteItems = (listId, itemId, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${listId}/items/${itemId}`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.delete(url, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

// API call to update items in shopping list
const updateItems = (listId, itemId, itemUpdate, errorMessage) => {
  url = `${BASE_URL}/shoppinglists/${listId}/items/${itemId}`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.put(url, itemUpdate, config)
    .then(response => notify.show(response.data.message, 'success'))
    .catch(error => handleError(error, errorMessage));
};

const logoutUser = (errorMessage, historyConfig) => {
  url = `${BASE_URL}/auth/logout`;
  const config = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  axios.post(url, '', config)
    .then((response) => {
      localStorage.removeItem('token');
      notify.show(response.data.message, 'success');
      historyConfig.push('/login');
    })
    .catch(error => handleError(error, errorMessage));
};

const Client = {
  registerUser,
  loginUser,
  getShoppingLists,
  createShoppingList,
  deleteShoppingList,
  updateShoppingList,
  getItems,
  addItems,
  deleteItems,
  updateItems,
  logoutUser,
};

export default Client;
