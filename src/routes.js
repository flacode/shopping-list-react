import React from 'react';
import {Router, IndexRouter} from 'react-router-dom'; // IndexRoute is just for one line you want commit to git
import ShoppingListDashBoard from './components/shoppingList';
import ItemDashBoard from './components/shoppingListItems';
import App from './components/App';

export default(
    <Router path='/' component={App}>
        <IndexRouter component={ShoppingListDashBoard}/>
        <Router path='items' component={ItemDashBoard}/>
    </Router>
)