import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShoppingListDashboard from './shoppingList/shoppingList';
import ItemDashBoard from './listItems/shoppingListItems';
import RegistrationForm from './account/registrationForm';
import LoginForm from './account/loginForm';

const App = () => (
  <div>
    <Switch>
      <Route path="/register" component={RegistrationForm} />
      <Route path="/login" component={LoginForm} />
      <Route exact path="/shoppinglist/items" component={ItemDashBoard} />
      <Route path="/shoppinglists" component={ShoppingListDashboard} />
    </Switch>
  </div>
);

export default App;
