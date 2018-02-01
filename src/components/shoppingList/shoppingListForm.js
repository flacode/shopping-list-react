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
import validator from 'validator';
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
      const fields = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      fields[name] = value;
      fieldErrors[name] = error;
      this.setState({
        fields,
        fieldErrors,
      });
    }

    // function to perform client side validation
    validate = () => {
      // const list = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      const errMessages = Object.keys(fieldErrors).filter(key => fieldErrors[key]);
      // if (!list.name) return true;
      // if (!list.due_date) return true;
      if (errMessages.length > 0) return true;
      return false;
    }

    /* function to handle submission of form data.
     * Sends data to a function from props
     * Toggle the form to close it
    */
    handleFormSubmit = (event) => {
      event.preventDefault();
      if (this.validate()) return;
      this.props.handleFormSubmitted({
        name: this.state.fields.name,
        due_date: this.state.fields.due_date,
      });
      this.setState({
        fields: {
          name: '',
          due_date: '',
        },
      });
      this.props.handleToggle();
    }

    render() {
      return (
        <div>
          <Modal isOpen={this.props.openModal} toggle={this.props.handleToggle}>
            <ModalHeader className="modal-heading">{this.props.heading}</ModalHeader>
            <ModalBody>
              <Field
                label="Shopping list name"
                name="name"
                value={this.state.fields.name}
                onChange={this.handleInputChange}
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
                validate={val => (validator.isAfter(val) ? false : 'Date should not be before today.')}
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
