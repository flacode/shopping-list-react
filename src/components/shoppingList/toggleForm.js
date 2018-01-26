/* component to toggle shopping list form */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ShoppingListForm from './shoppingListForm';
import '../../App.css';

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
        <Button
          className="btn-list btn-auth"
          onClick={this.handleAddClick}
        >
        Create new list
        </Button>
      );
    }
}

ToggleableShoppingListForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ToggleableShoppingListForm;
