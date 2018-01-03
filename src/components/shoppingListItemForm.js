import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemForm extends Component{
    state = {
        fields: {
            name: this.props.name || '',
            quantity: this.props.quantity || '',
            status: this.props.status || '',
            bought_from: this.props.bought_from || ''
        }
    };

    onInputChange = (e) => {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
        })
    }

    handleFormSubmit = () =>{
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
                <label>
                    Name:
                    <input
                        name="name"
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={this.state.fields.quantity}
                        onChange={this.onInputChange}
                        min="0"
                    />
                </label>
                <label>
                    Bought From
                    <input
                        name="bought_from"
                        value={this.state.fields.bought_from}
                        onChange={this.onInputChange}
                    />
                </label>
                <label>
                    Status
                    <input
                        name="status"
                        value={this.state.fields.status}
                        onChange={this.onInputChange}
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