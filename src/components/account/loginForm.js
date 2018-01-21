import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Alert, Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import Field from '../field';
import Client from '../../client';
import '../../App.css';
import logo from '../../imgs/shoppinglist.png';

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
      const user = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
      if (!user.username) return true;
      if (!user.password) return true;
      if (errMessages.length) return true;
      return false;
    }

    render() {
      return (
        <Container>
          <Card className="card-container">
            <CardTitle className="thick-heading">SHOPPING LIST</CardTitle>
              <CardImg className="img-card" src={logo} alt="Card image cap" />
              <CardBody>
                <h3 className="name-card"> Login</h3>
                <Form className="form-signin">
                  <FormGroup>
                    <Field
                      label="Username or Email"
                      name="username"
                      value={this.state.fields.username}
                      onChange={this.onInputChange}
                    />
                  <Link className="pull-right auth-reset" to="/reset-password">Forgot password?</Link>
                    <Field
                      label="Password:"
                      name="password"
                      type="password"
                      value={this.state.fields.password}
                      onChange={this.onInputChange}
                    />
                  </FormGroup>
                  <div className="text-right">
                    <Button
                      className="btn-auth btn-signin"
                      disabled={this.validate()}
                      onClick={this.onFormSubmit}
                      color="primary"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                <br />
                <p className="login">
                  Dont have an account, please sign up <Link to="/register" className="auth-link">here</Link>.
                </p>
              </CardBody>
          </Card>
        </Container>
      );
    }
}

export default LoginForm;
