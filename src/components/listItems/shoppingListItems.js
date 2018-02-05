/* Item component to display items in a shopping list in a table */
import React, { Component } from 'react';
import {
  Container,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
import headerIcon from '../../imgs/header.png';
import ToggleableItemForm from './toggleForm';
import Client from '../../client';

class ItemDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      serverMessage: '',
      viewList: false,
      trueCount: 0,
    };
    this.listId = '';
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.listId = params.listId;
    this.loadItemsFromServer();

    // reload list automatically every 1 minute
    this.timer = setInterval(this.loadShoppingListsFromServer, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  toggle = () => {
    this.setState(prevState => ({ viewList: !prevState.viewList }));
  }

  // function to redirect user to login incase they are not authenticated
  serverError = (message) => {
    const { history } = this.props;
    return localStorage.getItem('token') === null ? history.push('/login') : notify.show(message, 'error');
  }

  serverData = (data) => {
    if (data.message) this.setState(() => ({ serverMessage: data.message, items: [] }));
    if (data.Items) {
      const count = data.Items.map(item => item.status).filter(v => v).length;
      this.setState(() => ({ serverMessage: '', items: data.Items, trueCount: count }));
    }
  }

  loadItemsFromServer = () => {
    Client.getItems(this.listId, this.serverData, this.serverError);
  }

  handleCreateItem = (item) => {
    Client.addItems(this.listId, item, this.serverError);
    this.loadItemsFromServer();
  }

  handleDeleteItem = (itemId) => {
    Client.deleteItems(this.listId, itemId, this.serverError);
    this.loadItemsFromServer();
  }

  handleUpdateItem = (itemId, item) => {
    Client.updateItems(this.listId, itemId, item, this.serverError);
    this.loadItemsFromServer();
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
                {' '}
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
              <Breadcrumb tag="nav">
                <BreadcrumbItem>
                  <Link className="list-name" to="/shoppinglists">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">{localStorage.getItem('listName')}</BreadcrumbItem>
              </Breadcrumb>
              <Progress
                animated
                color="info"
                value={Math.floor((this.state.trueCount / this.state.items.length) * 100)}
              >Items bought
              </Progress>
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
                        </div>
                        <div className="float-right">
                          <div className="action-btn">
                            <Button
                              className="icon-btn"
                              onClick={this.toggle}
                            >
                              <i className="fa fa-eye" />
                            </Button>
                            <Modal isOpen={this.state.viewList} toggle={this.toggle}>
                              <ModalHeader className="modal-heading">{item.name.toUpperCase()}</ModalHeader>
                              <ModalBody>
                                <p><b>Quantity:</b> {item.quantity}</p>
                                <p><b>Bought from:</b> {item.bought_from}</p>
                                <p><b>Status: </b> {item.status ? <span className="glyphicon glyphicon-check bought" /> : <span className="glyphicon glyphicon-unchecked not-bought" />}</p>
                              </ModalBody>
                              <ModalFooter>
                                <Button className="btn-auth" onClick={this.toggle}>Close</Button>
                              </ModalFooter>
                            </Modal>
                            { ' '}
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
                              className="icon-btn"
                              onClick={() => this.handleDeleteItem(item.id)}
                            >
                              <i className="fa fa-trash" />
                            </Button>
                          </div>
                        </div>
                        <div className="clear-float" />
                      </li>
                    ),
                  )
                  }
              </div>
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
};

export default ItemDashBoard;
