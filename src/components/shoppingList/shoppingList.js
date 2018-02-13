/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Input } from 'reactstrap';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Notifications, { notify } from 'react-notify-toast';
import ReactTooltip from 'react-tooltip';
import 'font-awesome/css/font-awesome.min.css';
import { PropagateLoader } from 'react-spinners';
import Client from '../../client';
import headerIcon from '../../imgs/header.png';
import ToggleableShoppingListForm from './toggleForm';
import '../../App.css';

class ShoppingListDashboard extends Component {
    state = {
      shoppingLists: [],
      serverMessage: '',
      currentPage: 1,
      totalLists: 0,
      searchKey: '',
      loading: false,
    };

    // get shopping lists from the server after component has mounted.
    componentDidMount() {
      this.loadShoppingListsFromServer();
    }

    // function to redirect user to login incase they are not authenticated
    serverError = (message) => {
      const { history } = this.props;
      return localStorage.getItem('token') === null ?
        history.push(
          {
            pathname: '/login',
            state: { errorMessage: message },
          }) :
        notify.show(message, 'error');
    }

    // function to handle successful API calls
    serverData = (data) => {
      if (data.shopping_lists) {
        this.setState(() =>
          ({
            serverMessage: '',
            shoppingLists: data.shopping_lists,
            totalLists: data.total,
            loading: false,
          }));
      }
      if (data.message) {
        this.setState(() =>
          ({
            currentPage: 1,
            serverMessage: data.message,
            shoppingLists: [],
            loading: false,
          }));
        this.pageChange(1);
      }
    }

    // function to handle make API call for getting shopping lists from the server
    loadShoppingListsFromServer = () => {
      this.setState(() => ({ loading: true }));
      Client.getShoppingLists(this.serverData, this.serverError, 4, this.state.currentPage, this.state.searchKey);
    }

    // function to make API call to create new shopping list
    handleCreateShoppingList = async (shoppingList) => {
      await Client.createShoppingList(shoppingList, this.serverError);
      await this.loadShoppingListsFromServer();
    }

    // function to make API call to delete shopping list
    handleDeleteShoppingList = async (shoppingListId) => {
      const deleteItem = window.confirm('Are you sure you want to delete this shopping list?');
      if (deleteItem) {
        await Client.deleteShoppingList(shoppingListId, this.serverError);
        await this.loadShoppingListsFromServer();
      }
      return false;
    }

    // function to make API call to update shopping list item
    handleUpdateShoppingList = async (shoppingListId, shoppingList) => {
      await Client.updateShoppingList(shoppingListId, shoppingList, this.serverError);
      await this.loadShoppingListsFromServer();
    }

    pageChange = (page) => {
      // use page directly to get the lists on that page
      Client.getShoppingLists(this.serverData, this.serverError, 4, page);
      this.setState(() => ({
        currentPage: page,
      }));
    }

    // function to handle change in user input for search functionality
    handleChange = (event) => {
      const { value } = event.target;
      this.setState(() => ({
        searchKey: value,
      }));
    }

    // function to make API call to get shopping lists that match search key
    handleSearch = (event) => {
      event.preventDefault();
      this.loadShoppingListsFromServer();
    }

    render() {
      const { history } = this.props;
      return (
        <div>
          <Container className="list-page">
            <div className="panel panel-default">
              <div className="panel-heading site-background">
                <span className="page-heading">SHOPPING LIST <img src={headerIcon} alt="icon for heading" /></span>
                <span className="pull-right">
                  {localStorage.getItem('username')}
                  {'  '}
                  <Button
                    data-tip="logout"
                    className="icon-btn"
                    onClick={() => Client.logoutUser(this.serverError, history)}
                  >
                    <i className="fa fa-sign-out" />
                  </Button>
                  <ReactTooltip place="top" type="dark" effect="solid" />
                </span>
              </div>
              <div className="panel-body">
                <Notifications />
                <div className="row mt-2">
                  <div className="offset-sm-8">
                    <form onSubmit={this.handleSearch}>
                      <Input type="search" name="search" placeholder="Search" onChange={this.handleChange} />
                    </form>
                  </div>
                </div>
                { this.state.loading ?
                  <div className="list-group">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="offset-sm-4 list-name">
                          <h4>Loading shopping lists</h4>
                        </div>
                        <div className="offset-sm-6 mb-5">
                          <PropagateLoader
                            loading={this.state.loading}
                            color="#22b49e"
                            size={15}
                          />
                        </div>
                      </div>
                    </li>
                  </div> :
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
                          <h3 className="list-name">
                            {shoppingList.name}
                          </h3>
                          <div className="list-group-item-text">
                            <div className="float-left">
                              Due date: { shoppingList.due_date }
                            </div>
                            <div className="float-right">
                              <div className="action-btn">
                                <Link
                                  to={`/shoppinglist/${shoppingList.id}/items`}
                                  className="link-btn"
                                  data-tip="View items"
                                  onClick={() => { localStorage.setItem('listName', shoppingList.name); }}
                                >
                                  <Button className="icon-btn">
                                    <i className="fa fa-eye" />
                                  </Button>
                                </Link>
                                <ReactTooltip place="top" type="dark" effect="solid" />
                                {' '}
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
                                  data-tip="Delete list"
                                  onClick={() => this.handleDeleteShoppingList(shoppingList.id)}
                                >
                                  <i className="fa fa-trash" />
                                </Button>
                                <ReactTooltip place="top" type="dark" effect="solid" />
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
                }
                <ToggleableShoppingListForm
                  handleForm={this.handleCreateShoppingList}
                />
                <br />
                <div className="row">
                  <div className="offset-sm-9">
                    <Pagination
                      total={this.state.totalLists}
                      pageSize={4}
                      onChange={this.pageChange}
                      current={this.state.currentPage}
                      hideOnSinglePage
                    />
                  </div>
                </div>
              </div>
              <div className="panel-footer site-background">@flacode</div>
            </div>
          </Container>
        </div>
      );
    }
}

export default ShoppingListDashboard;
