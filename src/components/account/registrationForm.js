import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
import validator from 'validator';
import Field from '../field';
import Client from '../../client';
import '../../App.css';
import logo from '../../imgs/shoppinglist.png';
import loading from '../../imgs/loading.gif';

class RegistrationForm extends Component {
    state = {
      loading: false,
      fields: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      fieldErrors: {},
      server: {
        error: '',
        message: '',
      },
    }

    // funtion to handle input change by updating the state
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

    // function to clear the form fields on reset
    onFormReset = (evt) => {
      evt.preventDefault();
      this.setState({
        fields: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      });
    }

  // function to handle the submit event of the form
    onFormSubmit = (evt) => {
      evt.preventDefault();
      const user = this.state.fields;

      // validate fields before updating state
      if (this.validate()) return;

      // send validated data to the server
      this.setState({ loading: true });
      Client.registerUser(user, this.successServer, this.errorServer);
    }

    // function to handle a successful API operation
    successServer = (message) => {
      this.setState({
        loading: false,
        server: {
          error: false,
          message,
        },
      });
    }

      // function to handle unsuccessful API operation
      errorServer = (message) => {
        this.setState({
          loading: false,
          server: {
            error: true,
            message,
          },
        });
      }

      // function to validate the form for both field and form errors
      validate = () => {
        const user = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const serverErrors = this.state.server;
        const errorMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
        if (!user.username) return true;
        if (!user.email) return true;
        if (!user.password) return true;
        if (!user.confirmPassword) return true;
        if (errorMessages.length) return true;
        if (serverErrors.error) return true;
        return false;
      }


      render() {
        return (
        // TODO: send the successful registration message through login redirect
          <Container>
            {
              // check if there are no server errors then redirect to login
              this.state.server.error === false ? <Redirect to="/login" /> : null
            }
            <Card className="card-container">
              <CardTitle className="thick-heading">SHOPPING LIST</CardTitle>
              <CardImg className="img-card" src={logo} alt="Card image cap" />
              <CardBody>
                <h3 className="name-card">Sign up</h3>
                {this.state.server.error && <Alert color="danger">{this.state.server.message}</Alert> }
                <Form className="form-signin">
                  <FormGroup>
                    <Field
                      label="Username"
                      name="username"
                      value={this.state.fields.username}
                      onChange={this.onInputChange}
                      validate={
                          val => (
                            validator.isAlphanumeric(val) ? false : 'Username should contain only letters and numbers'
                          )
                        }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={this.state.fields.email}
                      onChange={this.onInputChange}
                      validate={
                                    val => (validator.isEmail(val) ? false : 'Invalid Email')
                                }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      label="Password"
                      name="password"
                      type="password"
                      value={this.state.fields.password}
                      onChange={this.onInputChange}
                      validate={
                                    val => (val.length >= 8 ? false : 'Password should be atleast 8 characters long')
                                }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={this.state.fields.confirmPassword}
                      onChange={this.onInputChange}
                      validate={
                                    val => (val === this.state.fields.password ? false : 'Passwords do not match')
                                }
                    />
                  </FormGroup>

                  {/*
                    * disable the button when sending data to the server.
                    * avoid multiple submissions
                    * avoid submitting invalid data
                */ }
                  <div className="btn-center">
                    <Button
                      className="btn-auth"
                      disabled={this.validate() || this.state.loading}
                      onClick={this.onFormSubmit}
                    >
                      { this.state.loading ? <img alt="loading" src={loading} /> : 'Submit'}
                    </Button>{' '}
                    <Button
                      className="btn-auth"
                      onClick={this.onFormReset}
                    >
                            Reset
                    </Button>
                  </div>
                </Form>
                <br />
                <p className="login">
                        Already have an account, please <Link to="/login" className="auth-link">login</Link>.
                </p>
              </CardBody>
            </Card>
          </Container>
        );
      }
}

export default RegistrationForm;
