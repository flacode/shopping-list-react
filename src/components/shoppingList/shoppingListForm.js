/* Component to render form for shopping list */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Notifications, { notify } from 'react-notify-toast';
import Field from '../field';
import '../../App.css';

class ShoppingListForm extends Component {
    state = {
      fields: {
        name: this.props.name,
        due_date: this.props.due_date,
      },
      fieldErrors: {},
    };

    // function to handle changes to the form input and update the state
    handleInputChange = ({ name, value, error }) => {
      const field = { [name]: value };
      const fieldError = { [name]: error };
      this.setState(() => ({
        fields: { ...this.state.fields, ...field },
        fieldErrors: { ...this.state.fieldErrors, ...fieldError },
      }));
    }

    // function to perform client side validation
    validate = () => {
      const { fieldErrors, fields } = this.state;
      const errMessages = Object.keys(fieldErrors).filter(key => fieldErrors[key]);
      if (!fields.name) {
        notify.show('Shopping list name is required', 'error');
        return true;
      }
      if (!fields.due_date) {
        notify.show('Shopping list due date is required', 'error');
        return true;
      }
      if (errMessages.length > 0) return true;
      return false;
    }

    /* function to handle submission of form data.
     * Sends data to a function from props
     * Toggle the form to close it
    */
    handleFormSubmit = (event) => {
      const { name, due_date } = this.state.fields;
      event.preventDefault();
      if (this.validate()) return;
      this.props.handleFormSubmitted({
        name,
        due_date,
      });
      this.setState(() => ({
        fields: {
          name: '',
          due_date: '',
        },
      }));
      this.props.handleToggle();
    }

    render() {
      return (
        <div>
          <Modal isOpen={this.props.openModal} toggle={this.props.handleToggle}>
            <ModalHeader className="modal-heading">{this.props.heading}</ModalHeader>
            <Notifications options={{ zIndex: 5000 }} />
            <ModalBody>
              <Field
                label="Shopping list name"
                name="name"
                value={this.state.fields.name}
                onChange={this.handleInputChange}
                validate={(val) => {
                  const letters = /^[0-9a-zA-Z ]+$/;
                  return letters.test(val) ? false : 'Name should contain only numbers and letters';
                }}
                labels
              />
              <br />
              <Field
                label="Due date"
                name="due_date"
                type="date"
                value={this.state.fields.due_date}
                onChange={this.handleInputChange}
                labels
                validate={val => (
                  new Date(Date.parse(val)).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) ?
                  false :
                  'Date should not be before today.'
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button className="btn-auth" onClick={this.handleFormSubmit}>{this.props.submitText}</Button>{' '}
              <Button className="btn-auth" onClick={this.props.handleToggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
}

ShoppingListForm.propTypes = {
  submitText: PropTypes.string.isRequired,
  handleFormSubmitted: PropTypes.func.isRequired,
  name: PropTypes.string,
  due_date: PropTypes.string,
  openModal: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};

ShoppingListForm.defaultProps = {
  name: '',
  due_date: '',
};

export default ShoppingListForm;
