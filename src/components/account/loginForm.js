import React from 'react';
import Field from '../field';

class LoginForm extends React.Component {
    state = {
      users: [],
      fields: {
        username: '',
        password: '',
      },
      fieldErrors: {},
    }

    onInputChange = ({ name, value, error }) => {
      const { fields, fieldErrors } = this.state;
      fields[name] = value;
      fieldErrors[name] = error;
      this.setState({
        fields,
        fieldErrors,
      });
    }

    onFormReset = (evt) => {
      evt.preventDefault();
      this.setState({
        fields: {
          username: '',
          password: '',
        },
      });
    }

    onFormSubmit = (evt) => {
      evt.preventDefault();
      const { user, users } = this.state;

      // validate before updating state
      if (this.validate()) return;
      this.setState({
        users: users.concat(user),
        fields: {
          username: '',
          password: '',
        },
      });
    }

    validate = () => {
      const { user, fieldErrors } = this.state;
      const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
      if (!user.username) return true;
      if (!user.password) return true;
      if (errMessages.length) return true;
      return false;
    }

    render() {
      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={this.onFormSubmit} onReset={this.onFormReset}>
            <Field
              label="Username or Email:"
              name="username"
              value={this.state.fields.username}
              onChange={this.onInputChange}
            />
            <br />
            <Field
              label="Password:"
              name="password"
              type="password"
              value={this.state.fields.password}
              onChange={this.onInputChange}
            />
            <br />
            <input type="submit" disabled={this.validate()} />
            <input type="reset" />
          </form>
          <h3>Sample logged in users</h3>
          {this.state.users.map((user, i) =>
            <p key={i}>{user.username}, {user.password}</p>)}
        </div>
      );
    }
}

export default LoginForm;
