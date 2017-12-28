import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemForm extends Component{
    state = {
        name: this.props.name || '',
        quantity: this.props.quatity || '',
        status: this.props.status || '',
        bought_from: this.props.bought_from || '',
    };

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        })
    }

    handleQuantityChange = (e) => {
        this.setState({
            quantity: e.target.value,
        })
    }

    handleStatusChange = (e) => {
        this.setState({
            status: e.target.value,
        })
    }

    handleBoughtFromChange = (e) => {
        this.setState({
            bought_from: e.target.value,
        })
    }

    handleFormSubmit = () =>{
        this.props.onFormSubmit({
            id: this.props.id,
            name: this.state.name,
            quantity: this.state.quantity,
            status: this.state.status,
            bought_from: this.state.bought_from,
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
                    Quantity:
                    <input
                        type="number"
                        onChange={this.handleQuantityChange}
                        min="0"
                    />
                </label>
                <label>
                    Bought From
                    <input
                        type="text"
                        onChange={this.handleBoughtFromChange}
                    />
                </label>
                <label>
                    Status
                    <input
                        type="text"
                        onChange={this.handleStatusChange}
                    />
                </label>
                <button onClick={this.handleFormSubmit}>{submitText}</button>
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