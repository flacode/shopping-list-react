import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import Field from './field';

class RegistrationForm extends Component {
    state = {
      users: [],
      fields: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      fieldErrors: {},
    }

    onInputChange = ({ name, value, error }) => {
      const fields = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      fields[name] = value;
      fieldErrors[name] = error;
      this.setState({
        fields,
        fieldErrors,
      });
    }

    onFormReset = (event) => {
      event.preventDefault();
      this.setState({
        fields: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      });
    }

    onFormSubmit = (event) => {
      event.preventDefault();
      const user = this.state.fields;
      const users = this.state.users;

      // validate before updating state
      if (this.validate()) return;
      this.setState({
        users: users.concat(user),
        fields: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      });
    }

    validate = () => {
      const user = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
      if (!user.username) return true;
      if (!user.email) return true;
      if (!user.password) return true;
      if (!user.confirmPassword) return true;
      if (errMessages.length) return true;
      return false;
    }

    render() {
      return (
        <div>
          <h1>User Registration</h1>
          <form onSubmit={this.onFormSubmit} onReset={this.onFormReset}>
            <Field
              label="Username:"
              name="username"
              value={this.state.fields.username}
              onChange={this.onInputChange}
            />
            <br />
            <Field
              label="Email:"
              name="email"
              type="email"
              value={this.state.fields.email}
              onChange={this.onInputChange}
              validate={
                            val => (isEmail(val) ? false : 'Invalid Email')
                        }
            />
            <br />
            <Field
              label="Password:"
              name="password"
              type="password"
              value={this.state.fields.password}
              onChange={this.onInputChange}
              validate={
                            val => (val.length >= 8 ? false : 'Password should be atleast 8 characters long')
                        }
            />
            <br />
            <Field
              label="Confirm Password:"
              name="confirmPassword"
              type="password"
              value={this.state.fields.confirmPassword}
              onChange={this.onInputChange}
              validate={
                            val => (val === this.state.fields.password ? false : 'Passwords do not match')
                        }
            />
            <br />
            <input type="submit" disabled={this.validate()} />
            <input type="reset" />
          </form>
          <h3>Sample registered users</h3>
          {this.state.users.map((user, i) =>
            <p key={i}>{user.username}, {user.email}, {user.password}, {user.confirmPassword}</p>,
                    )}
        </div>
      );
    }
}

export default RegistrationForm;
