import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Alert,
  Card,
  CardBody,
  CardTitle,
  CardImg,
} from 'reactstrap';
import Field from '../field';
import Client from '../../client';
import '../../App.css';
import logo from '../../imgs/shoppinglist.png';
import loading from '../../imgs/loading.gif';

class LoginForm extends React.Component {
    state = {
      loading: false,
      fields: {
        username: '',
        password: '',
      },
      server: {
        error: '',
        message: '',
      },
    }

    // handle form submission
    onFormSubmit = (event) => {
      event.preventDefault();
      const user = this.state.fields;

      // send validated data to the server
      this.setState(() => ({ loading: true }));
      Client.loginUser(user, this.successServer, this.errorServer);
    }

    // handle input change event
    handleInputChange = ({ name, value }) => {
      const fields = { [name]: value };
      fields[name] = value;
      this.setState(() => ({
        fields: { ...this.state.fields, ...fields },
        server: {
          error: '',
          message: '',
        },
      }));
    }

    // function to handle a successful API operation
    successServer = (message) => {
      localStorage.setItem('username', this.state.fields.username);
      this.setState(() => ({
        loading: false,
        server: {
          error: false,
          message,
        },
      }));
    }

    // function to handle unsuccessful API operation
    errorServer = (message) => {
      this.setState(() => ({
        loading: false,
        server: {
          error: true,
          message,
        },
      }));
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
              <Notifications />
              <h3 className="name-card"> Login</h3>
              {this.state.server.error && <Alert color="danger">{this.state.server.message}</Alert> }
              <Form className="form-signin">
                <FormGroup>
                  <Field
                    label="Username"
                    name="username"
                    value={this.state.fields.username}
                    onChange={this.handleInputChange}
                  />
                  <Link className="pull-right auth-reset" to="/reset-password">Forgot password?</Link>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={this.state.fields.password}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <div className="text-right">
                  <Button
                    className="btn-auth btn-signin"
                    disabled={this.state.server.error || this.state.loading}
                    onClick={this.onFormSubmit}
                    color="primary"
                  >
                    {this.state.loading ? <img alt="loading" src={loading} /> : 'Login'}
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
