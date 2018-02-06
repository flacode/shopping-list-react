/* Component to toggle form for create item in shopping list */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import ItemForm from './shoppingListItemForm';
import '../../App.css';

class ToggleableItemForm extends Component {
    state = {
      modal: false,
    };

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal,
      }));
    }

    handleFormSubmit = (item) => {
      this.props.handleForm(item);
    }

    render() {
      return (
        <div>
          { this.props.updateItem ?
            <div>
              <Button className="icon-btn" onClick={this.toggle}>
                <i className="fa fa-edit" />
              </Button>
              <ItemForm
                openModal={this.state.modal}
                handleToggle={this.toggle}
                handleFormSubmitted={this.handleFormSubmit}
                heading="Update shopping list item"
                submitText="Update"
                name={this.props.name}
                quantity={this.props.quantity}
                status={this.props.status}
                bought_from={this.props.bought_from}
              />
            </div> :
            <div>
              <Button
                className="btn-list btn-auth"
                onClick={this.toggle}
              >
                Add new item
              </Button>
              <ItemForm
                openModal={this.state.modal}
                handleToggle={this.toggle}
                handleFormSubmitted={this.handleFormSubmit}
                heading="Add item to shopping list"
                submitText="Add"
              />
            </div>
        }
        </div>
      );
    }
}

ToggleableItemForm.propTypes = {
  handleForm: PropTypes.func.isRequired,
  name: PropTypes.string,
  quantity: PropTypes.number,
  status: PropTypes.bool,
  bought_from: PropTypes.string,
  updateItem: PropTypes.bool,
};

ToggleableItemForm.defaultProps = {
  updateItem: false,
  name: '',
  quantity: 0,
  status: false,
  bought_from: '',
};

export default ToggleableItemForm;
