import React, { Component } from 'react';
import ShoppingListTable from './shoppingList';
import ItemTable from './shoppingListItems';
import Registration from './register';
import Login from './login';
import NewShoppingList from './createShoppingList';
import './App.css';

class App extends Component {
  render() {

    const shoppingLists = [
      {"name": "Food", "id": "1", "due_date": "2017-07-09"},
      {"name": "School items", "id": "2", "due_date": "2017-08-09"},
      {"name": "Hardware", "id": "3", "due_date": "2017-07-29"}
    ]

    const items = [
      {"name": "rice", "id": "1", "bought_from": "supermarket", "quantity": "5", "status": "false"},
      {"name": "plates", "id": "2", "bought_from": "supermarket", "quantity": "2", "status": "false"},
      {"name": "matooke", "id": "3", "bought_from": "market", "quantity": "6", "status": "true"}
    ]

    return (
      <div className="App">
        <Registration />
        <br/>
        <br/>
        <Login />
        <br/>
        <br/>
        <NewShoppingList items={items} />
        <h1>Sample Shopping Lists</h1>
        <ShoppingListTable shoppingLists={shoppingLists} />
        <br/>
        <h1> Sample shopping list items</h1>
        <ItemTable items={items} />
      </div>
    );
  }
}

export default App;
