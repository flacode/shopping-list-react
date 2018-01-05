import React, { Component } from 'react';

class RegistrationForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.baseState = this.state;
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleInputChange(e){
        const value = e.target.value;
        const name = e.target.name;
        // add validation later
        this.setState(
            {[name]: value}
        );
    }

    handleClick(e){
        e.preventDefault();
        // ToBeDone validate form 
        const url = " https://deployment-shopping-list-api.herokuapp.com/auth/register";
        let payload = {
            "username": this.state.username,
            "email": this.state.email,
            "password":this.state.password
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(function(response){
            console.log(response)
        })
    }

    render(){
        return(
            <form>
                <label>
                    Username: 
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        required="required"
                    />
                </label>
                <br/>
                <label>
                    Email: 
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required="required"
                    />
                </label>
                <br/>
                <label>
                    Password: 
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                        required="required"
                    />
                </label>
                <br />
                <label>
                    Confirm Password: 
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={this.handleInputChange}
                        required="required"
                    />
                </label>
                <br />
                <input type="submit" value="Register" onClick={this.handleClick}/>
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