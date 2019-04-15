import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './loginCard.css';

export class LoginCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            pass: ""
        }

        this.checkEmail = this.checkEmail.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
    }

    checkEmail(mail){
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailformat.test(mail);
    }

    validateLogin(e){
        debugger;
        if(!this.checkEmail(this.state.email.value))
        {
            window.alert("Invalid email address");
            e.preventDefault();
            return;
        }
        if(!this.state.pass.value)
        {
            window.alert("Please enter a valid password");
            e.preventDefault();
            return;
        }
        window.alert("You am loged in");
        return true;
    }

    render() {
        return(
            <>
            <div id="login">
                <Card className="text-center" id="loginCard">
                    <Card.Header id="logHead">
                        <h4>Login</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlID="login.email">
                                <Form.Control type="email" placeholder="email" ref={ input => this.state.email = input}></Form.Control>
                            </Form.Group>
                            <Form.Group controlID="login.pass">
                                <Form.Control type="password" placeholder="password" ref={ input => this.state.pass = input}></Form.Control>
                            </Form.Group>
                            <Form.Group controlID="login.submit">
                                <Button block className="btn-success" onClick={ this.validateLogin }>Login</Button>
                            </Form.Group>
                            <hr/>
                            <Form.Group controlID="login.register">
                                <Button block className="btn-primary" onClick={ this.props.toggleRegister }>Register</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            </>
        )
    }
}

export default LoginCard;