/* component to toggle shopping list form */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import ShoppingListForm from './shoppingListForm';
import '../../App.css';

class ToggleableShoppingListForm extends Component {
    state = {
      modal: false,
    };

    toggle = () => {
      this.setState(() => ({
        modal: !this.state.modal,
      }));
    }

    handleFormSubmit = (shoppingList) => {
      // pass the shopping list object to the parent component
      this.props.handleForm(shoppingList);
    }

    render() {
      return (
        <div>
          { this.props.updateList &&
          <div>
            <Button className="icon-btn" onClick={this.toggle}>
              <i className="fa fa-edit" />
            </Button>
            <ShoppingListForm
              openModal={this.state.modal}
              handleToggle={this.toggle}
              handleFormSubmitted={this.handleFormSubmit}
              heading="Update shopping list"
              submitText="Update"
              name={this.props.name}
              due_date={this.props.due_date}
            />
          </div>
          }
          { !this.props.updateList &&
          <div>
            <Button className="btn-list btn-auth" onClick={this.toggle}>Create new shopping list</Button>
            <ShoppingListForm
              openModal={this.state.modal}
              handleToggle={this.toggle}
              handleFormSubmitted={this.handleFormSubmit}
              heading="Create new shopping list"
              submitText="Create"
            />
          </div>
          }
        </div>
      );
    }
}

ToggleableShoppingListForm.propTypes = {
  handleForm: PropTypes.func.isRequired,
  updateList: PropTypes.bool,
  name: PropTypes.string,
  due_date: PropTypes.string,
};

ToggleableShoppingListForm.defaultProps = {
  updateList: false,
  name: '',
  due_date: '',
};

export default ToggleableShoppingListForm;
