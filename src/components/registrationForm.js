import React, { Component } from 'react';
import Field from './field.js';
import isEmail from 'validator/lib/isEmail';
import Client from '../client.js';

class RegistrationForm extends Component {
    state = {
        users: [],
        fields: {
            username: 'flavia',
            email: 'flavia.nshemerirwe@gmail.com',
            password: '1234567890',
            confirmPassword: '1234567890',
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
            fieldErrors
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
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        if (!user.username) return true;
        if (!user.email) return true;
        if (!user.password) return true;
        if (!user.confirmPassword) return true;
        if (errMessages.length) return true;
        if (serverErrors.error) return true;
        return false;
    }

    validateServer = () => {
        console.log("Validated server", this.state.server);
    }


    onFormSubmit = (evt) => {
        evt.preventDefault();
        let user = this.state.fields;
        let users = this.state.users;


        // validate fields before updating state
        if(this.validate()) return;

        // send validated data to the server
        Client.registerUser(user, this.successServer, this.errorServer);
        
        //if(!this.validate()) { console.log("Server error"); return; };
        users.push(user);
    }

    render(){
        console.log("Validated server", this.state.server);
        return(
            <div>
                <h1>User Registration</h1>
                {this.state.server.error && <span style={{color: "red"}}>{this.state.server.message}</span> }
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
                            (val) => isEmail(val) ? false : "Invalid Email"
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
                            (val) => val.length >= 8 ? false : "Password should be atleast 8 characters long"
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
                            (val) => val===this.state.fields.password ? false : "Passwords do not match"
                        }
                    />
                    <br />
                    <input type="submit" disabled={this.validate()}/>
                    <input type="reset"/>
                </form>
                <h3>Sample registered users</h3>
                { this.state.users ? this.state.users.map((user, i) => 
                        <p key={i}>{user.username}, {user.email}, {user.password}, {user.confirmPassword}</p>
                    ) : 'not found'}
            </div>
        );
    }
}

export default RegistrationForm;