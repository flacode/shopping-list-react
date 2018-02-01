/* Item component to display items in a shopping list in a table */
import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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

    serverError = (message) => {
      notify.show(message, 'error');
    }

    serverData = (data) => {
      if (data.message) this.setState({ serverMessage: data.message, items: [] });
      if (data.Items) this.setState({ serverMessage: '', items: data.Items });
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
                            >
                              <i className="fa fa-eye" />
                            </Button>
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
