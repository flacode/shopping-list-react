/* Item component to display items in a shopping list in a table */
import React, { Component } from 'react';
import {
  Container,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
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

  serverData = (data) => {
    if (data.message) this.setState(() => ({ serverMessage: data.message, items: [], loading: false }));
    if (data.Items) {
      this.setState(() => ({
        serverMessage: '',
        items: data.Items,
        loading: false,
      }));
    }
  }

  loadItemsFromServer = () => {
    this.setState(() => ({ loading: true }));
    Client.getItems(this.listId, this.serverData, this.serverError);
  }

  handleCreateItem = (item) => {
    Client.addItems(this.listId, item, this.serverError);
    setTimeout(() => this.loadItemsFromServer(), 300);
  }

  handleDeleteItem = (itemId) => {
    const deleteItem = window.confirm('Are you sure you want to delete this item?');
    if (deleteItem) {
      Client.deleteItems(this.listId, itemId, this.serverError);
      setTimeout(() => this.loadItemsFromServer(), 300);
    }
    return false;
  }

  handleUpdateItem = (itemId, item) => {
    Client.updateItems(this.listId, itemId, item, this.serverError);
    setTimeout(() => this.loadItemsFromServer(), 300);
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
                  { this.state.items.length <= 0 ?
                    <li className="list-group-item">
                      <p> {this.state.serverMessage} </p>
                    </li> :
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
