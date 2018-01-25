import React, { Component } from 'react';
import ShoppingListDashboard from './shoppingList';
import ItemDashBoard from './shoppingListItems';
import RegistrationForm from './registrationForm';
import LoginForm from './loginForm';
import {Grid} from 'react-bootstrap';
import '../App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <LoginForm />
        <hr />
        <RegistrationForm />
        <hr />
        <ShoppingListDashboard />
        <hr />
        <h1> Sample shopping list items...</h1>
        <ItemDashBoard />
      </Grid>
    );
  }
}

export default App;
