/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import Notifications, { notify } from 'react-notify-toast';
import 'font-awesome/css/font-awesome.min.css';
import Client from '../../client';
import headerIcon from '../../imgs/header.png';
import ToggleableShoppingListForm from './toggleForm';
import '../../App.css';

class ShoppingListDashboard extends Component {
    state = {
      shoppingLists: {},
      serverMessage: '',
    };

    componentDidMount() {
      this.loadShoppingListsFromServer();

      // reload list automatically every 1 minute
      this.timer = setInterval(this.loadShoppingListsFromServer, 60000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    serverError = (message) => {
      notify.show(message, 'error');
    }

    serverData = (data) => {
      if (data.message) this.setState({ serverMessage: data.message, shoppingLists: {} });
      if (data.shopping_lists) this.setState({ serverMessage: '', shoppingLists: data.shopping_lists });
    }

    loadShoppingListsFromServer = () => {
      Client.getShoppingLists(this.serverData, this.serverError);
    }

    // i need to get the server errors and display them
    handleCreateShoppingList = (shoppingList) => {
      Client.createShoppingList(shoppingList, this.serverError);
      this.loadShoppingListsFromServer();
    }

    handleDeleteShoppingList = (shoppingListId) => {
      Client.deleteShoppingList(shoppingListId, this.serverError);
      this.loadShoppingListsFromServer();
    }

    handleUpdateShoppingList = (shoppingListId, shoppingList) => {
      console.log('Update', shoppingList);
      Client.updateShoppingList(shoppingListId, shoppingList, this.serverError);
      this.loadShoppingListsFromServer();
    }

    render() {
      return (
        <div>
          {
            localStorage.getItem('token') === null &&
            <Redirect to="/login" />

          }
          <Container className="list-page">
            <div className="panel panel-default">
              <div className="panel-heading site-background">
                <span className="page-heading">SHOPPING LIST <img src={headerIcon} alt="icon for heading" /></span>
                <span className="pull-right">
                  {localStorage.getItem('username')} <span className="glyphicon glyphicon-log-out" />
                </span>
              </div>
              <div className="panel-body">
                <Notifications />
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

                            <div className="float-left">
                              Due date: { shoppingList.due_date }
                            </div>
                            <div className="float-right">
                              <div className="action-btn">
                                <ToggleableShoppingListForm
                                  handleForm={updatedList => this.handleUpdateShoppingList(
                                    shoppingList.id, updatedList,
                                  )}
                                  name={shoppingList.name}
                                  due_date={new Date(shoppingList.due_date).toJSON().slice(0, 10)}
                                  updateList
                                />
                                {' '}
                                <Button
                                  className="icon-btn"
                                  onClick={() => this.handleDeleteShoppingList(shoppingList.id)}
                                >
                                  <i className="fa fa-trash" />
                                </Button>
                              </div>
                            </div>
                            <div className="clear-float" />
                          </div>
                        </li>
                      ),
                    )}
                  </div>
                    }
                </div>
                <ToggleableShoppingListForm
                  handleForm={this.handleCreateShoppingList}
                />
              </div>
              <div className="panel-footer site-background">Panel Footer</div>
            </div>
          </Container>
        </div>
      );
    }
}

export default ShoppingListDashboard;
