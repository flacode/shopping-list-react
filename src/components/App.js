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
          <Route exact path='/' component={RegistrationForm}/>
          <Route path='/register' component={RegistrationForm}/>
          <Route path='/login' component={LoginForm}/>
          <Route path='/shoppinglist' component={ShoppingListDashboard}/>
          <Route path='/shoppinglist/items' component={ItemDashBoard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
