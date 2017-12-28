import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingListForm extends Component{
    state = {
        name: this.props.name || '',
        due_date: this.props.due_date || ''
    };

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        })
    }

    handleDateChange = (e) => {
        this.setState({
            due_date: e.target.value,
        })
    }

    handleFormSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            name: this.state.name,
            due_date: this.state.due_date
        })
    }

    render(){
        const submitText = this.props.id ? 'Update' : 'Create';
        return(
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        onChange={this.handleNameChange}
                    />
                </label>
                <label>
                    Due date:
                    <input
                        type="date"
                        onChange={this.handleDateChange}
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