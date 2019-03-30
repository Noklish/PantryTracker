import React, { Component } from 'react';

import { LoginCard } from './LoginCard'

export class Login extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            fname: "",
            lname: ""
        }

        this.checkEmail = this.checkEmail.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
        this.validateRegister = this.validateRegister.bind(this);
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

    validateRegister(){

    }

    handleChange(event) {
        //debugger;
        this.setState({
            value: event.target.value
        });
        event.preventDefault();
    }

    render() {
        return (
            <>
            <LoginCard></LoginCard>
            <div className="container">
                <div className="modal fade text-center" id="registerModal" role="dialog">
                    <div className="modal-dialog" id="regModalDialogue">
                        <div className="modal-content" id="regModalContent">
                            <div className="modal-header">
                                <h4>Register</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className= "modal-body" id="regModalBody">
                                <div className="form-group">
                                    <form action="#" id="regForm">
                                        <input className="form-control" type="text" placeholder="email" name="regEmail" id="regEmail" required/>
                                        <br/>
                                        <input className="form-control" type="password" placeholder="password" name="regPassword" id="regPassword" required/>
                                        <br/>
                                        <input className="form-control" type="password" placeholder="confirm password" name="regPassword" id="confPassword" required/>
                                        <br/>
                                        <input className="form-control" type="text" placeholder="First Name" name="fName" id="fname" required/>
                                        <br/>
                                        <input className="form-control" type="text" placeholder="Last Name" name="lName" id="lname" required/>
                                        <br/>
                                        <button className="modalButton btn btn-success regButton" onClick={this.validateRegister}>Register</button>
                                        <button className="modalButton btn btn-secondary cancelButton" data-dismiss="modal">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            </>
        )
    }
}

export default Login;