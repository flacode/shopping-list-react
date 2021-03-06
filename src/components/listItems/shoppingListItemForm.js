/* Component to render form for creating a shopping list item */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from 'reactstrap';
import Notifications, { notify } from 'react-notify-toast';
import validator from 'validator';
import '../../App.css';
import Field from '../field';

class ItemForm extends Component {
    state = {
      fields: {
        name: this.props.name,
        quantity: this.props.quantity,
        status: this.props.status,
        bought_from: this.props.bought_from,
      },
      fieldErrors: {},
    };

    // toggle status of a check box
    handleCheck = () => {
      const field = { status: !this.state.fields.status };
      this.setState(() => ({
        fields: { ...this.state.fields, ...field },
      }));
    }

    // handle input change and update the state for controlled components
    handleInputChange = ({ name, value, error }) => {
      const field = { [name]: value };
      const fieldError = { [name]: error };
      this.setState(() => ({
        fields: { ...this.state.fields, ...field },
        fieldErrors: { ...this.state.fieldErrors, ...fieldError },
      }));
    }

    // check for any errors in the state
    validate = () => {
      const { fields, fieldErrors } = this.state;
      const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
      if (!fields.name) {
        notify.show('Item name is required', 'error');
        return true;
      }
      if (!fields.quantity) {
        notify.show('Item quantity is required', 'error');
        return true;
      }
      if (errMessages.length) return true;
      return false;
    }

    // handle form submit event
    handleFormSubmit = (event) => {
      const {
        name,
        quantity,
        status,
        bought_from,
      } = this.state.fields;
      event.preventDefault();
      if (this.validate()) return;
      this.props.handleFormSubmitted({
        name,
        quantity,
        status,
        bought_from,
      });
      this.setState(() => ({
        fields: {
          name: '',
          quantity: 0,
          status: false,
          bought_from: '',
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
                label="Name"
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
                label="Quantity"
                name="quantity"
                type="number"
                value={this.state.fields.quantity}
                onChange={this.handleInputChange}
                labels
                validate={val => (validator.isFloat(val, { min: 0 }) ? false : 'Quantity should be a positive number.')}
              />
              <br />
              <Field
                label="Bought From"
                name="bought_from"
                value={this.state.fields.bought_from}
                onChange={this.handleInputChange}
                validate={(val) => {
                  const letters = /^[0-9a-zA-Z ]+$/;
                  return letters.test(val) ? false : 'Location should contain only numbers and letters';
                }}
                labels
              />
              <br />
              <div className="row">
                <div className="col-sm-5">
                  <Label for="status" className="label-text">
                    Status
                  </Label>
                </div>
                <div className="col-sm-7">
                  <Input
                    id="status"
                    name="status"
                    type="checkbox"
                    onChange={this.handleCheck}
                    checked={this.state.fields.status}
                  />
                </div>
              </div>
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

ItemForm.propTypes = {
  submitText: PropTypes.string.isRequired,
  handleFormSubmitted: PropTypes.func.isRequired,
  name: PropTypes.string,
  quantity: PropTypes.number,
  bought_from: PropTypes.string,
  status: PropTypes.bool,
  openModal: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};

ItemForm.defaultProps = {
  name: '',
  quantity: 0,
  bought_from: '',
  status: false,
};

export default ItemForm;
