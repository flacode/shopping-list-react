import React, { Component } from 'react';
import PropTypes from 'prop-types';

// component for validation of individual form fields
class Field extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
    }

    state = {
        value: this.props.value,
        error: false
    }

    // allows field component be updated by  bothe itself and parent
    componentWillReceiveProps(update){
        this.setState({
            value: update.value
        });
    }

    // method to accept and validate user input, update state and call parent event handler
    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value) : false;

        this.setState(
            {
                value,
                error
            }
        );

        this.props.onChange({name, value, error});
    }
    
    render() {
        return(
            <div>
                <span style={{color: "red"}}>
                    {this.state.error && 
                        <p>{this.state.error}</p> }
                </span>
                <label>
                        {this.props.label}
                        <span style={{color: "red"}}>
                            {"*"}
                        </span>
                        <input 
                            name={this.props.name}
                            value={this.state.value}
                            type={this.props.type}
                            onChange={this.onChange}
                        />
                    </label>
            </div>
        );
    }
}
 export default Field; 