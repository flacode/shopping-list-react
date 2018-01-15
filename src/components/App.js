import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ShoppingListDashboard from './shoppingList/shoppingList';
import ItemDashBoard from './listItems/shoppingListItems';
import RegistrationForm from './account/registrationForm';
import LoginForm from './account/loginForm';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/register' component={RegistrationForm}/>
          <Route path='/login' component={LoginForm}/>
          <Route exact path='/shoppinglist/items' component={ItemDashBoard}/>
          <Route path='/shoppinglist' component={ShoppingListDashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
