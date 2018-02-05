import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ShoppingListDashboard from './shoppingList/shoppingList';
import ItemDashBoard from './listItems/shoppingListItems';
import RegistrationForm from './account/registrationForm';
import LoginForm from './account/loginForm';
import NotFound from './notFound';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={RegistrationForm} />
      <Route path="/register" component={RegistrationForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/shoppinglist/:listId/items" component={ItemDashBoard} />
      <Route path="/shoppinglists" component={ShoppingListDashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default withRouter(App);
