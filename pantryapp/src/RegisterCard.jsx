import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

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
        return(
            <Modal show={this.props.show} onHide={this.props.toggleRegister}>
                <Modal.Dialog>
                    <Modal.Header>
                        <h4>Register</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        )
    }
}

export default RegisterCard;