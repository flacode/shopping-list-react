/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHeading from '../tableHeading';
import ToggleableShoppingListForm from './toggleForm';
import ShoppingListRow from './listRow';

class ShoppingListDashboard extends Component {
    state = {
      shoppingLists: [],
    };

    componentDidMount() {
      this.loadShoppingListsFromServer();

      // reload list automatically every 5 seconds
      setInterval(this.loadShoppingListsFromServer, 5000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    loadShoppingListsFromServer = () => {
      const shoppingLists = [
        { name: 'Food', id: '1', due_date: '2017-07-09' },
        { name: 'School items', id: '2', due_date: '2017-08-09' },
        { name: 'Hardware', id: '3', due_date: '2017-07-29' },
      ];
      this.setState({
        shoppingLists,
      });
    }

    handleCreateShoppingList = (shoppingList) => {
      shoppingList.id = Math.floor((Math.random() * 100) + 1);
      const updatedShoppingLists = this.state.shoppingLists.concat(shoppingList);
      this.setState({
        shoppingLists: updatedShoppingLists,
      });
    }

    handleDeleteShoppingList = (shoppingListId) => {
      console.log(`shopping list to be deleted ${shoppingListId}`);
    }

    handleUpdateShoppingList = (shoppingList) => {
      console.log(`update clicked for shopping list ${shoppingList.id}`);
    }

    render() {
      return (
        <div>
          <h2>Shopping list: #name</h2>
          <p> this user is { localStorage.getItem('loggedIn') ? 'is loggedIn' : 'Not logged in'}</p>
          <ShoppingListTable
            shoppingLists={this.state.shoppingLists}
            handleDeleteRow={this.handleDeleteShoppingList}
            handleUpdateRow={this.handleUpdateShoppingList}
          />
          <ToggleableShoppingListForm onFormSubmit={this.handleCreateShoppingList} />
        </div>
      );
    }
}

const ShoppingListTable = (props) => {
  const rows = props.shoppingLists.map(shoppingList => (
    <ShoppingListRow
      shoppingList={shoppingList}
      key={shoppingList.id.toString()}
      handleDelete={props.handleDeleteRow}
      handleUpdate={props.handleUpdateRow}
    />
  ));
  return (
    <table>
      <thead>
        <tr>
          <TableHeading heading="Name" />
          <TableHeading heading="Due date" />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

ShoppingListTable.propTypes = {
  shoppingLists: PropTypes.shape.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  handleUpdateRow: PropTypes.func.isRequired,
};

export default ShoppingListDashboard;
