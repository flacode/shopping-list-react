/* component to toggle shopping list form */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShoppingListForm from './shoppingListForm';

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

export default ToggleableShoppingListForm;