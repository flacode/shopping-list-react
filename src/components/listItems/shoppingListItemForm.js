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

    handleInputChange = ({ name, value, error }) => {
      const field = { [name]: value };
      const fieldError = { [name]: error };
      this.setState(() => ({
        fields: { ...this.state.fields, ...field },
        fieldErrors: { ...this.state.fieldErrors, ...fieldError },
      }));
    }

    validate = () => {
      // const item = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
      // if (!item.name) return true;
      // if (!item.quantity) return true;
      // if (!item.status) return true;
      // if (!item.bought_from) return true;
      if (errMessages.length) return true;
      return false;
    }

    handleFormSubmit = (event) => {
      event.preventDefault();
      if (this.validate()) return;

      this.props.handleFormSubmitted({
        name: this.state.fields.name,
        quantity: this.state.fields.quantity,
        status: this.state.fields.status.toString(),
        bought_from: this.state.fields.bought_from,
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
            <ModalBody>
              <Field
                label="Name"
                name="name"
                value={this.state.fields.name}
                onChange={this.handleInputChange}
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
                  { this.state.error && <div className="form-error">{this.state.error}</div>}
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
