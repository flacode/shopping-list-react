/* Item component to display items in a shopping list in a table */
import React, { Component } from 'react';
import {
  Container,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Input,
} from 'reactstrap';
import Pagination from 'rc-pagination';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
import ReactTooltip from 'react-tooltip';
import { PropagateLoader } from 'react-spinners';
import headerIcon from '../../imgs/header.png';
import ToggleableItemForm from './toggleForm';
import Client from '../../client';

class ItemDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      serverMessage: '',
      currentPage: 1,
      totalItems: 0,
      searchKey: '',
      loading: false,
      listName: localStorage.getItem('listName'),
    };
    this.listId = '';
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.listId = params.listId;
    this.loadItemsFromServer();
  }

  // function to redirect user to login incase they are not authenticated
  serverError = (message) => {
    const { history } = this.props;
    return localStorage.getItem('token') === null ? history.push('/login') : notify.show(message, 'error');
  }

  // function to handle successful API calls
  serverData = (data) => {
    if (data.Items) {
      this.setState(() => ({
        serverMessage: '',
        items: data.Items,
        totalItems: data.total,
        loading: false,
      }));
    }
    if (data.message) {
      this.setState(() =>
        ({
          currentPage: 1,
          serverMessage: data.message,
          items: [],
          loading: false,
        }));
      this.pageChange(1);
    }
  }

  // function to make API call to load items from the server
  loadItemsFromServer = () => {
    this.setState(() => ({ loading: true }));
    Client.getItems(this.listId, this.serverData, this.serverError, 3, this.state.currentPage, this.state.searchKey);
  }

  // function to make API call to add items to shopping list
  handleCreateItem = async (item) => {
    await Client.addItems(this.listId, item, this.serverError);
    await this.loadItemsFromServer();
  }

  // function to make API call to delete items from the shopping list
  handleDeleteItem = async (itemId) => {
    const deleteItem = window.confirm('Are you sure you want to delete this item?');
    if (deleteItem) {
      await Client.deleteItems(this.listId, itemId, this.serverError);
      await this.loadItemsFromServer();
    }
    return false;
  }

  // function to make API call to update item in a shopping list
  handleUpdateItem = async (itemId, item) => {
    await Client.updateItems(this.listId, itemId, item, this.serverError);
    await this.loadItemsFromServer();
  }

  pageChange = (page) => {
    // use page directly to get the lists on that page
    Client.getItems(this.listId, this.serverData, this.serverError, 3, page, this.state.searchKey);
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
    this.loadItemsFromServer();
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        { localStorage.getItem('token') === null && <Redirect to="/login" />}
        <Container className="list-page">
          <div className="panel panel-default">
            <div className="panel-heading site-background">
              <span className="page-heading">SHOPPING LIST <img src={headerIcon} alt="icon for heading" /></span>
              <span className="pull-right">
                {localStorage.getItem('username')}
                {' '}
                <Button
                  data-tip="logout"
                  className="icon-btn"
                  onClick={(event) => {
                  event.preventDefault();
                  Client.logoutUser(this.serverError, history);
                }}
                >
                  <i className="fa fa-sign-out" />
                </Button>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </span>
            </div>
            <div className="panel-body">
              <Notifications />
              <Breadcrumb tag="nav">
                <BreadcrumbItem>
                  <Link className="list-name" to="/shoppinglists">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">{this.state.listName}</BreadcrumbItem>
              </Breadcrumb>
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
                        <h4>Loading shopping list items</h4>
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
                  { this.state.serverMessage &&
                    <li className="list-group-item">
                      <p> {this.state.serverMessage} </p>
                    </li>
                  }
                  {this.state.items.length > 0 &&
                    this.state.items.map(item => (
                      <li key={item.id} className="list-group-item">
                        <div className="float-left">
                          { item.status ?
                            <s className="label-text"><h3 className="list-name">{item.name}</h3></s> :
                            <h3 className="list-name">{item.name}</h3>
                          }
                          <p><b>Quantity:</b> {item.quantity}{'  '}
                            <b>Bought from:</b> {item.bought_from ? item.bought_from : 'None' }{'  '}
                            <b>Status: </b> {item.status ?
                              <span className="list-name"><i className="fa fa-check" /></span> :
                              <span className="not-bought"><i className="fa fa-check" /></span>}
                          </p>
                        </div>
                        <div className="float-right">
                          <div className="action-btn">
                            <ToggleableItemForm
                              handleForm={updatedItem => this.handleUpdateItem(item.id, updatedItem)}
                              name={item.name}
                              quantity={item.quantity}
                              status={item.status}
                              bought_from={item.bought_from}
                              updateItem
                            />
                            {' '}
                            <Button
                              data-tip="Delete item"
                              className="icon-btn"
                              onClick={() => this.handleDeleteItem(item.id)}
                            >
                              <i className="fa fa-trash" />
                            </Button>
                            <ReactTooltip place="top" type="dark" effect="solid" />
                          </div>
                        </div>
                        <div className="clear-float" />
                      </li>
                    ),
                  )
                  }
                </div>
              }
              <ToggleableItemForm handleForm={this.handleCreateItem} />
              { this.state.items.length > 0 &&
                <div className="row">
                  <div className="offset-sm-9">
                    <Pagination
                      total={this.state.totalItems}
                      pageSize={3}
                      onChange={this.pageChange}
                      current={this.state.currentPage}
                      hideOnSinglePage
                    />
                  </div>
                </div>
                }
            </div>
            <div className="panel-footer site-background">@flacode</div>
          </div>
        </Container>
      </div>
    );
  }
}

ItemDashBoard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      listId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.object,
};

export default ItemDashBoard;
