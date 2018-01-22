import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Alert, Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import Field from '../field';
import Client from '../../client';
import '../../App.css';
import logo from '../../imgs/shoppinglist.png';

class LoginForm extends React.Component {
    state = {
      fields: {
        username: '',
        password: '',
      },
      fieldErrors: {},
      server: {
        error: '',
        message: '',
        saveStatus: false,
      },
    }

    onInputChange = ({ name, value, error }) => {
      const fields = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      fields[name] = value;
      fieldErrors[name] = error;
      this.setState({
        fields,
        fieldErrors,
        server: {
          error: '',
          message: '',
        },
      });
    }

    onFormSubmit = (evt) => {
      evt.preventDefault();
      const user = this.state.fields;

      // validate fields before updating state
      if (this.validate()) return;

      // send validated data to the server
      this.setState({ server: { saveStatus: true } });
      Client.loginUser(user, this.successServer, this.errorServer);
      this.setState({ server: { saveStatus: false } });
    }

    // function to handle a successful API operation
    successServer = (message) => {
      this.setState({
        server: {
          error: false,
          message,
        },
      });
    }

    // function to handle unsuccessful API operation
    errorServer = (message) => {
      this.setState({
        server: {
          error: true,
          message,
        },
      });
    }

    validate = () => {
      const user = this.state.fields;
      const fieldErrors = this.state.fieldErrors;
      const serverErrors = this.state.server;
      const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
      if (!user.username) return true;
      if (!user.password) return true;
      if (errMessages.length) return true;
      if (serverErrors.error) return true;
      return false;
    }

    render() {
      return (
        <Container>
          {
            // check if there are no server errors then redirect to login
            this.state.server.error === false ? <Redirect to="/shoppinglists" /> : null
          }
          <Card className="card-container">
            <CardTitle className="thick-heading">SHOPPING LIST</CardTitle>
            <CardImg className="img-card" src={logo} alt="Card image cap" />
            <CardBody>
              <h3 className="name-card"> Login</h3>
              {this.state.server.error && <Alert color="danger">{this.state.server.message}</Alert> }
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
                    disabled={this.validate() && this.state.server.saveStatus}
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
