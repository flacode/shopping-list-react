import React, { Component } from 'react';
import ShoppingListDashboard from './shoppingList';
import ItemDashBoard from './shoppingListItems';
import RegistrationForm from './registrationForm';
import LoginForm from './loginForm';
import {Grid} from 'react-bootstrap';
//import Login from './Login';
//import NewShoppingList from './createShoppingList';
import '../App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <LoginForm />
        <RegistrationForm />
        <ShoppingListDashboard />
        <h1> Sample shopping list items...</h1>
        <ItemDashBoard />
        {/*<br/>
        <br/>
        <Login />
        <br/>
        <br/>
        <NewShoppingList items={items} />
        <ShoppingListTable shoppingLists={shoppingLists} />
        <br/>
        */}
      </Grid>
    );
  }
}

export default App;