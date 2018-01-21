/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHeading from '../tableHeading';
import ShoppingListForm from './shoppingListForm';

class ShoppingListDashboard extends Component {
    state = {
      shoppingLists: [],
    };

    componentDidMount() {
      this.loadShoppingListsFromServer();
      this.timer = setInterval(this.loadShoppingListsFromServer, 5000); // reload list automatically every 5 seconds
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

    componentWillUnmount() {
      clearInterval(this.timer);
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
  shoppingLists: PropTypes.array.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  handleUpdateRow: PropTypes.func.isRequired,
};

class ShoppingListRow extends Component {
    onClickUpdate = () => {
      // shoppinglist object to update-redirect to edit form
      this.props.handleUpdate(this.props.shoppingList);
    }
    onClickDelete = () => {
      this.props.handleDelete(this.props.shoppingList.id);
    }

    render() {
      const shoppingList = this.props.shoppingList;
      return (
        <tr>
          <td>{shoppingList.name}</td>
          <td>{shoppingList.due_date}</td>
          <td colSpan={2}>
            <button> View</button>
            <button onClick={this.onClickUpdate}>Update</button>
            <button onClick={this.onClickDelete}>Delete</button>
          </td>
        </tr>
      );
    }
}
ShoppingListRow.propTypes = {
  shoppingList: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

class ToggleableShoppingListForm extends Component {
    state = {
      isOpen: false,
    };

    handleAddClick = () => {
      this.setState({
        isOpen: true,
      });
    }

    handleFormClose = () => {
      this.setState({
        isOpen: false,
      });
    }

    handleFormSubmit = (shoppingList) => {
      if (shoppingList.name === '') {
        // will return error message here
        console.log('No shopping list name provided');
        return;
      }
      if (shoppingList.due_date === '') {
        // will return error message here
        console.log('No due date provided');
        return;
      }
      this.props.onFormSubmit(shoppingList);
      this.setState({
        isOpen: false,
      });
    }

    render() {
      if (this.state.isOpen) {
        return (
          <ShoppingListForm onFormClose={this.handleFormClose} onFormSubmit={this.handleFormSubmit} />
        );
      }
      return (
        <button type="button" onClick={this.handleAddClick} />
      );
    }
}

ToggleableShoppingListForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ShoppingListDashboard;
