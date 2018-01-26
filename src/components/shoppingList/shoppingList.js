/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Notifications, { notify } from 'react-notify-toast';
import TableHeading from '../tableHeading';
import ShoppingListRow from './listRow';
import Client from '../../client';
import logo from '../../imgs/image.png';
import ToggleableShoppingListForm from './toggleForm';
import '../../App.css';

class ShoppingListDashboard extends Component {
    state = {
      shoppingLists: {},
      serverMessage: '',
      error: false,
    };

    componentDidMount() {
      this.loadShoppingListsFromServer();

      // reload list automatically every 5 seconds
      this.timer = setInterval(this.loadShoppingListsFromServer, 5000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    serverError = (message) => {
      this.setState({ error: message });
      notify.show(message, 'error', -1);
    }

    serverData = (data) => {
      if (data.message) this.setState({ serverMessage: data.message });
      if (data.shopping_lists) this.setState({ shoppingLists: data.shopping_lists });
    }

    loadShoppingListsFromServer = () => {
      Client.getShoppingLists(this.serverData, this.serverError);
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
          {
            this.state.error &&
            <Redirect to="/login" />
          }

          <Container className="list-page">
            <Notifications />
            <div className="panel panel-default">
              <div className="panel-heading site-background">
                <span className="page-heading">SHOPPING LIST <img src={logo} alt="icon for heading" /></span>
                <span className="pull-right">
                  {localStorage.getItem('username')} <span className="glyphicon glyphicon-log-out" />
                </span>
              </div>
              <div className="panel-body">
                <div className="list-group">
                  {this.state.serverMessage &&
                    <li className="list-group-item">
                      <p> {this.state.serverMessage} </p>
                    </li>
                    }
                  {this.state.shoppingLists.length > 0 &&
                  <div>
                    { this.state.shoppingLists.map(shoppingList =>
                      (
                        <li key={shoppingList.id} className="list-group-item">
                          {/* TODO:add link to items in the shopping list */}
                          <h3 className="list-name">{shoppingList.name}</h3>
                          <div className="list-group-item-text">
                            <a href="#">edit </a> <a href="#">delete </a> <a href="#">update </a>
                          </div>
                        </li>
                      ),
                    )}
                  </div>
                    }
                </div>
                <ToggleableShoppingListForm onFormSubmit={this.handleCreateShoppingList} />
              </div>
              <div className="panel-footer site-background">Panel Footer</div>
            </div>
          </Container>
          {/* <h2>Shopping list: #name</h2>
          <p> this user is { Client.isLoggedIn() ? 'is loggedIn' : 'Not logged in'}</p>
          <ShoppingListTable
            shoppingLists={this.state.shoppingLists}
            handleDeleteRow={this.handleDeleteShoppingList}
            handleUpdateRow={this.handleUpdateShoppingList}
          />
          <ToggleableShoppingListForm onFormSubmit={this.handleCreateShoppingList} /> */}
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
