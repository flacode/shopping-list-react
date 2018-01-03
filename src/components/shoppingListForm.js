import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingListForm extends Component{
    state = {
        fields: {
            name: this.props.name || '',
            due_date: this.props.due_date || ''
        }
    };

    onInputChange = (e) => {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
        })
    }

    handleFormSubmit = () => {
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
                <label>
                    Name:
                    <input
                        name="name"
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                    />
                </label>
                <label>
                    Due date:
                    <input
                        type="date"
                        name="due_date"
                        value={this.state.fields.due_date}
                        onChange={this.onInputChange}
                    />
                </label>
                <button onClick={this.handleFormSubmit}>{submitText}</button>
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