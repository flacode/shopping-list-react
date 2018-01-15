import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../field.js';
import validator from 'validator';

class ShoppingListForm extends Component{
    state = {
        fields: {
            name: this.props.name || '',
            due_date: this.props.due_date || ''
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
        const list = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        if (!list.name) return true;
        if (!list.due_date) return true;
        if(errMessages.length) return true;
        return false;
    }

    handleFormSubmit = () => {
        if (this.validate()) return;
        this.props.onFormSubmit({
            id: this.props.id,
            name: this.state.fields.name,
            due_date: this.state.fields.due_date
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
                    validate={(val) => validator.isAlphanumeric(val) ? false : "Shopping list name should contain numbers or letters only."}
                />
                <br />
                <Field
                    label="Due date:"
                    name="due_date"
                    type="date"
                    value={this.state.fields.due_date}
                    onChange={this.onInputChange}
                    validate={(val) => validator.isAfter(val) ? false : "Date should not be before today."}
                />
                <button onClick={this.handleFormSubmit} disabled={this.validate()} >{submitText}</button>
                <button onClick={this.props.onFormClose}>Cancel</button>
            </div>
        );
    }
}

ShoppingListForm.propTypes = {
    submitText: PropTypes.string,
    onFormClose: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
}

export default ShoppingListForm;