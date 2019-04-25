import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import './registerCard.css';

export class RegisterCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            fname: "",
            lname: "",
            show: false
        }

        this.checkEmail = this.checkEmail.bind(this);
        this.validateRegister = this.validateRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    checkEmail(mail){
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailformat.test(mail);
    }

    validateRegister(e){
        if(!this.checkEmail(this.state.email.value))
        {
            window.alert("Invalid email");
            e.preventDefault();
            return;
        }
        if(!this.state.pass.value)
        {
            window.alert("Invalid password");
            e.preventDefault();
            return;
        }
        if(!this.state.fname.value)
        {
            window.alert("Please enter your name");
            e.preventDefault();
            return;
        }
        if(!this.state.lname.value)
        {
            window.alert("Please enter your name");
            e.preventDefault();
            return;
        }
        window.alert("You're did it, your member now");
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
            <Modal show={this.props.show} onHide={this.props.toggleRegister} id="regModal">
                <Modal.Dialog id="regDialogue">
                    <Modal.Header id="regHead">
                        <h4>Register</h4>
                        <Button variant="secondary" data-dismiss="modal" onClick={this.props.toggleRegister} id="regX">&times;</Button>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlID="register.email">
                            <Form.Control type="email" placeholder="email" ref={ input => this.state.email = input}></Form.Control>
                        </Form.Group>
                        <Form.Group controlID="register.pass">
                            <Form.Control type="password" placeholder="password" ref={ input => this.state.pass = input}></Form.Control>
                        </Form.Group>
                        <Form.Group controlID="register.fname">
                            <Form.Control type="text" placeholder="first name" ref={ input => this.state.fname = input}></Form.Control>
                        </Form.Group>
                        <Form.Group controlID="register.lname">
                            <Form.Control type="text" placeholder="last name" ref={ input => this.state.lname = input}></Form.Control>
                        </Form.Group>
                        <Button variant="success" onClick={this.validateRegister} className="regButton">Register</Button>
                        <Button variant="secondary" data-dismiss="modal" onClick={this.props.toggleRegister} className="regButton">Cancel</Button>
                    </Form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        )
    }
}

export default RegisterCard;