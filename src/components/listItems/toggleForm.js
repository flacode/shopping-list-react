/* Component to toggle form for create item in shopping list */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemForm from './shoppingListItemForm';

class ToggleableItemForm extends Component {
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

    handleFormSubmit = (item) => {
      if (item.name === '') {
        // will return error message here
        console.log('Item name provided');
        return;
      }
      if (item.quantity === '') {
        // will return error message here
        console.log('No quantity provided');
        return;
      }
      if (item.bought_from === '') {
        // will return error message here
        console.log('No bought from provided');
        return;
      }
      if (item.status === '') {
        // will return error message here
        console.log('No status provided');
        return;
      }

      this.props.onFormSubmit(item);
      this.setState({
        isOpen: false,
      });
    }

    render() {
      if (this.state.isOpen) {
        return (
          <ItemForm onFormClose={this.handleFormClose} onFormSubmit={this.handleFormSubmit} />
        );
      }
      return (
        <button type="button" onClick={this.handleAddClick}>Add</button>
      );
    }
}

ToggleableItemForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ToggleableItemForm;
