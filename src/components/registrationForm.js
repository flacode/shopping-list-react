import React, { Component } from 'react';
import Field from './field.js';
import isEmail from 'validator/lib/isEmail';
import Client from '../client.js';
import { Redirect, Link } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Alert, Card, CardBody, CardTitle, CardImg, CardSubtitle } from 'reactstrap';
import '../App.css';
import logo from'../imgs/shoppinglist.png';

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
        }
    }

    onInputChange = ({name, value, error}) => {
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
            }
        });
    }

    onFormReset = (evt) => {
        evt.preventDefault();
        this.setState({
            fields: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        });
    }

    successServer = (message) => {
        this.setState({
            server: {
                error: false,
                message: message,
            },
         });
    }

    errorServer = (message) => {
        this.setState({
            server: {
                error: true,
                message: message,
            },
        });
    }

    validate = () => {
        const user = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const serverErrors = this.state.server;
        const errorMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        if (!user.username) return true;
        if (!user.email) return true;
        if (!user.password) return true;
        if (!user.confirmPassword) return true;
        if (errorMessages.length) return true;
        if (serverErrors.error) return true;
        return false;
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();
        let user = this.state.fields;

        // validate fields before updating state
        if(this.validate()) return;

        // send validated data to the server
        Client.registerUser(user, this.successServer, this.errorServer);
    }

    render(){
        return(
            // TODO: send the successful registration message through login redirect
            <Container>
                { 
                    // check if there are no server errors then redirect to login
                    this.state.server.error === false ? <Redirect to='/login'/> : null
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
                                label="Username:"
                                name="username"
                                value={this.state.fields.username}
                                onChange={this.onInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                label="Email:"
                                name="email"
                                type="email"
                                value={this.state.fields.email}
                                onChange={this.onInputChange}
                                validate={
                                    (val) => isEmail(val) ? false : "Invalid Email"
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                label="Password:" 
                                name="password"
                                type="password"
                                value={this.state.fields.password}
                                onChange={this.onInputChange}
                                validate={
                                    (val) => val.length >= 8 ? false : "Password should be atleast 8 characters long"
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                label="Confirm Password:" 
                                name="confirmPassword"
                                type="password"
                                value={this.state.fields.confirmPassword}
                                onChange={this.onInputChange}
                                validate={
                                    (val) => val===this.state.fields.password ? false : "Passwords do not match"
                                }
                            />
                        </FormGroup>
                        <Button
                            className="btn-signin"
                            disabled={this.validate()}
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
