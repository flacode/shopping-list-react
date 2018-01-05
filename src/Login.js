import React, { Component } from 'react';

class LoginForm extends Component{
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
                    Password: 
                    <input
                        type="password"
                    />
                </label>
                <br/>
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default class Login extends Component{
    render(){
        return (
            <div>
                <h2>User Login</h2>
                <LoginForm />
                <p>You dont have an account, please register <a href="#">here</a>.</p>
            </div>
        );
    }
}