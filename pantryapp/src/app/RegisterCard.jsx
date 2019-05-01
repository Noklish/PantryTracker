import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import './registerCard.css';
import { repository } from '../api/repository';

import { Link } from 'react-router-dom';

export class RegisterCard extends React.Component {
    repo = new repository();
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            userName: "",
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
        if(!this.checkEmail(this.state.email))
        {
            window.alert("Invalid email");
            e.preventDefault();
            return;
        }
        if(!this.state.pass)
        {
            window.alert("Invalid password");
            e.preventDefault();
            return;
        }
        if(!this.state.userName)
        {
            window.alert("Please enter a username");
            e.preventDefault();
            return;
        }
        this.repo.addAccount(this.state.userName, this.state.pass, this.state.email).then(res => alert("You've been successfully registered! You may now log into your account.")).catch(err => alert(err)).then(e => this.props.toggleRegister());
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
                        <Form.Group controlid="register.email">
                            <Form.Control type="email" placeholder="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}></Form.Control>
                        </Form.Group>
                        <Form.Group controlid="register.pass">
                            <Form.Control type="password" placeholder="password" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })}></Form.Control>
                        </Form.Group>
                        <Form.Group controlid="register.userName">
                            <Form.Control type="text" placeholder="username" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value })}></Form.Control>
                        </Form.Group>
                        <Button onClick={e => this.validateRegister(e)} className="btn btn-success regButton">Register</Button>
                        <Button variant="secondary" data-dismiss="modal" onClick={e => this.props.toggleRegister()} className="regButton">Cancel</Button>
                    </Form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        )
    }
}

export default RegisterCard;