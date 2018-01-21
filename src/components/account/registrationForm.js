import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Alert, Card, CardBody, CardTitle, CardImg, CardSubtitle } from 'reactstrap';
import validator from 'validator';
import Field from '../field';
import Client from '../../client';
import '../../App.css';
import logo from '../../imgs/shoppinglist.png';

class RegistrationForm extends Component {
    state = {
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
        _saveStatus: false,
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
      this.setState({ server: { saveStatus: true } });
      Client.registerUser(user, this.successServer, this.errorServer);
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

      // function to handle unsuccessful API Ooperation
      errorServer = (message) => {
        this.setState({
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
              <CardSubtitle className="name-card">Sign up</CardSubtitle>
              <CardBody>
                {this.state.server.error && <Alert color="danger">{this.state.server.message}</Alert> }
                <Form className="form-signin">
                  <FormGroup>
                    <Field
                      label="Username"
                      name="username"
                      value={this.state.fields.username}
                      onChange={this.onInputChange}
                      validate={
                                    val => (validator.isAlphanumeric(val) ? false : 'Invalid Username, should contain only letters and numbers')
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
                  <Button
                    className="btn-signin"
                    disabled={this.validate() || this.state.server.saveStatus}
                    onClick={this.onFormSubmit}
                    color="primary"
                    block
                  >
                            Submit
                  </Button>{' '}
                  <Button
                    className="btn-signin"
                    onClick={this.onFormReset}
                    color="secondary"
                    block
                  >
                            Reset
                  </Button>
                </Form>
                <p className="login">
                        Already have an account, please <Link to="/login" className="login-link">login</Link>.
                </p>
              </CardBody>
            </Card>
          </Container>
        );
      }
}

export default RegistrationForm;
