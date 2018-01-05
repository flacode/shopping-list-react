import React, { Component } from 'react';
import ShoppingListTable from './shoppingList';
import ItemTable from './shoppingListItems';
import RegistrationForm from './registrationForm';
import LoginForm from './loginForm';
//import Login from './Login';
//import NewShoppingList from './createShoppingList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegistrationForm />
        <LoginForm />
        <h1>Sample Shopping Lists</h1>
        <ShoppingListTable />
        <h1> Sample shopping list items</h1>
        <ItemTable />
        {/*<br/>
        <br/>
        <Login />
        <br/>
        <br/>
        <NewShoppingList items={items} />
        <ShoppingListTable shoppingLists={shoppingLists} />
        <br/>
        */}
      </div>
    );
  }
}

export default App;
