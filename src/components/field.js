import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';

// component for validation of individual form fields
class Field extends Component {
    state = {
      value: this.props.value,
      error: false,
    }

    // allows field component be updated by  bothe itself and parent
    componentWillReceiveProps(update) {
      this.setState({
        value: update.value,
      });
    }

    // method to accept and validate user input, update state and call parent event handler
    fieldChange = (event) => {
      const name = this.props.name;
      const value = event.target.value;
      const error = this.props.validate ? this.props.validate(value) : false;

      this.setState({
        value,
        error,
      });

      this.props.onChange({ name, value, error });
    }

    render() {
      return (
        <div>
          <Input
            name={this.props.name}
            value={this.state.value}
            placeholder={this.props.label}
            type={this.props.type}
            onChange={this.fieldChange}
            valid={this.state.error ? false : null}
          />
          <FormFeedback>{this.state.error}</FormFeedback>
        </div>
      );
    }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

Field.defaultProps = {
  type: null,
  value: null,
  validate: null,
};

export default Field;
