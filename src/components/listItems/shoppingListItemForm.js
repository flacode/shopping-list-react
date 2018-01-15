import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../field.js';
import validator from 'validator';

class ItemForm extends Component{
    state = {
        fields: {
            name: this.props.name || '',
            quantity: this.props.quantity || '',
            status: this.props.status || false,
            bought_from: this.props.bought_from || ''
        },
        fieldErrors: {}
    };

    onInputChange = ({name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        fields[name] = value;
        fieldErrors[name] = error;
        this.setState({
            fields,
            fieldErrors
        })
    }

    validate = () => {
        const item = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        if (!item.name) return true;
        if (!item.quantity) return true;
        if (!item.status) return true;
        if (!item.bought_from) return true;
        if(errMessages.length) return true;
        return false;
    }

    handleFormSubmit = (evt) => {
        evt.preventDefault();

        if (this.validate()) return;

        this.props.onFormSubmit({
            id: this.props.id,
            name: this.state.fields.name,
            quantity: this.state.fields.quantity,
            status: this.state.fields.status,
            bought_from: this.state.fields.bought_from,
        })
    }

    render(){
        const submitText = this.props.id ? 'Update' : 'Create';
        return(
            <div>
                <Field
                    label="Name:"
                    name="name"
                    value={this.state.fields.name}
                    onChange={this.onInputChange}
                    validate={(val) => validator.isAlphanumeric(val) ? false : "Item name should contain numbers or letters only."}
                />
                <br />
                <Field
                    label="Quantity:"
                    name="quantity"
                    value={this.state.fields.quantity}
                    onChange={this.onInputChange}
                    validate={(val) => validator.isFloat(val) ? false : "Quantity should be a number."}
                />
                <br />
                <Field
                    label="Bought From:"
                    name="bought_from"
                    value={this.state.fields.bought_from}
                    onChange={this.onInputChange}
                />
                <br />
                <Field
                    label="Status:"
                    name="status"
                    type="checkbox"
                    value={this.state.fields.status ? "true" : "false"} // set value to tru or false
                    onChange={this.onInputChange}
                    validate={(val) => validator.isBoolean(val) ? false : "Status can only be true or false."}
                />
                <br />
                <button onClick={this.handleFormSubmit} disabled={this.validate()} >{submitText}</button>
                <button onClick={this.props.onFormClose}>Cancel</button>
            </div>
        );
    }
}

ItemForm.propTypes = {
    submitText: PropTypes.string,
    onFormClose: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
}

export default ItemForm;