/* component to toggle shopping list form */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ShoppingListForm from './shoppingListForm';
import '../../App.css';

class ToggleableShoppingListForm extends Component {
    state = {
      modal: false,
    };

    toggle = () => {
      this.setState({
        modal: !this.state.modal,
      });
    }

    handleFormSubmit = (shoppingList) => {
      // pass the shopping list object to the parent component
      this.props.handleCreate(shoppingList);
    }

    render() {
      return (
        <div>
          <Button className="btn-list btn-auth" onClick={this.toggle}>Create new shopping list</Button>
          <ShoppingListForm
            openModel={this.state.modal}
            handleToggle={this.toggle}
            handleFormSubmitted={this.handleFormSubmit}
            heading="Create new shopping list"
            submitText="Create"
          />
        </div>
      );
    }
}

ToggleableShoppingListForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default ToggleableShoppingListForm;
