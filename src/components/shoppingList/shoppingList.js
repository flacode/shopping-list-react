/* shopping list component to display shopping lists in a table */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Input } from 'reactstrap';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Notifications, { notify } from 'react-notify-toast';
import 'font-awesome/css/font-awesome.min.css';
import { ClipLoader } from 'react-spinners';
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

    componentDidMount() {
      this.loadShoppingListsFromServer();

      // reload list automatically every 1 minute
      this.timer = setInterval(this.loadShoppingListsFromServer, 60000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
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

    serverData = (data) => {
      if (data.message) {
        this.setState(() =>
          ({
            serverMessage: data.message,
            shoppingLists: [],
            loading: false,
          }));
      }
      if (data.shopping_lists) {
        this.setState(() =>
          ({
            serverMessage: '',
            shoppingLists: data.shopping_lists,
            totalLists: data.total,
            loading: false,
          }));
      }
    }

    loadShoppingListsFromServer = () => {
      this.setState(() => ({ loading: true }));
      Client.getShoppingLists(this.serverData, this.serverError, 4, this.state.currentPage, this.state.searchKey);
    }

    handleCreateShoppingList = (shoppingList) => {
      Client.createShoppingList(shoppingList, this.serverError);
      this.loadShoppingListsFromServer();
    }

    handleDeleteShoppingList = (shoppingListId) => {
      Client.deleteShoppingList(shoppingListId, this.serverError);
      this.loadShoppingListsFromServer();
    }

    handleUpdateShoppingList = (shoppingListId, shoppingList) => {
      Client.updateShoppingList(shoppingListId, shoppingList, this.serverError);
      this.loadShoppingListsFromServer();
    }

    pageChange = (page) => {
      // use page directly to get the lists on that page
      Client.getShoppingLists(this.serverData, this.serverError, 4, page);
      this.setState(() => ({
        currentPage: page,
      }));
    }

    handleChange = (event) => {
      const { value } = event.target;
      this.setState(() => ({
        searchKey: value,
      }));
    }

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
                    className="icon-btn"
                    onClick={() => Client.logoutUser(this.serverError, history)}
                  >
                    <i className="fa fa-sign-out" />
                  </Button>
                </span>
              </div>
              <div className="panel-body">
                <Notifications />
                <div className="row">
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
                        <div className="offset-sm-5">
                          <ClipLoader
                            loading={this.state.loading}
                            color="#22b49e"
                            size={100}
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
                            { localStorage.setItem('listName', shoppingList.name) }
                          </h3>
                          <div className="list-group-item-text">
                            <div className="float-left">
                              Due date: { shoppingList.due_date }
                            </div>
                            <div className="float-right">
                              <div className="action-btn">
                                <Link to={`/shoppinglist/${shoppingList.id}/items`} className="link-btn">
                                  <Button className="icon-btn">
                                    <i className="fa fa-eye" />
                                  </Button>
                                </Link>
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
                }
                <ToggleableShoppingListForm
                  handleForm={this.handleCreateShoppingList}
                />
                <br />
                <div className="row">
                  <div className="offset-sm-9">
                    {this.state.shoppingLists.length > 0 &&
                    <Pagination
                      total={this.state.totalLists}
                      pageSize={4}
                      onChange={this.pageChange}
                      current={this.state.currentPage}
                      hideOnSinglePage
                    />}
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
