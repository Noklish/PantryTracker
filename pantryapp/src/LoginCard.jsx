import React, { Component } from 'react';

export class LoginCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            pass: ""
        }

        this.checkEmail = this.checkEmail.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    checkEmail(mail){
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailformat.test(mail);
    }

    validateLogin(e){
        debugger;
        if(this.checkEmail(this.state.email))
        {
            window.alert("Invalid email address");
            e.preventDefault();
        }
        if(!this.state.pass)
        {
            window.alert("Please enter a valid password");
            e.preventDefault();
        }
        return true;
    }

    handleChange(event) {
        //debugger;
        this.setState({
            value: event.target.value
        });
        event.preventDefault();
    }


    render() {
        return(
            <>
            <div className="row" id="banner">
                <div className="flex card text-center" id="loginCard">
                    <h3 className="card-header">Login</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <form name="loginForm">
                                <input className="form-control" type="text" placeholder="email" id="loginEmail" name="loginEmail" value={this.state.email} onChange={this.handleChange}/>
                                <br/>
                                <input className="form-control" type="password" placeholder="password" id="loginPassword" name="loginPassword" value={this.state.pass} onChange={this.handleChange}/>
                                <br/>
                                <label htmlFor="remember" className="remCheck">Remember me</label>
                                <input type="checkbox" className="remCheck" />
                                <button className="btn btn-success btn-block" id="loginButton" onClick = {this.validateLogin}>Login</button>
                            </form>
                            <hr/>
                            <button className="btn btn-primary btn-block regButton" id="regButton">Register</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default LoginCard;