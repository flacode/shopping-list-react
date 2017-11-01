import React, { Component } from 'react';

class RegistrationForm extends Component{
    render(){
        return(
            <form>
                <label>
                    Username: 
                    <input
                        type="text"
                    />
                </label>
                <br/>
                <label>
                    Email: 
                    <input
                        type="email"
                    />
                </label>
                <br/>
                <label>
                    Password: 
                    <input
                        type="password"
                    />
                </label>
                <br />
                <label>
                    Confirm Password: 
                    <input
                        type="password"
                    />
                </label>
                <br />
                <input type="submit" value="Register" />
            </form>
        );
    }
}

export default class Registration extends Component{
    render(){
        return (
            <div>
                <h2>User Registration</h2>
                <RegistrationForm />
                <p>Already have an account, please login <a href="#">here</a>.</p>
            </div>
        );
    }
}