import React, { Component } from 'react';

import { LoginCard } from './LoginCard';
import { RegisterCard } from './RegisterCard';
import './loginCard.css';

export class Login extends React.Component {
    constructor (props) {
        super(props);


        this.state = {
            show: false
        }

        this.toggleRegister = this.toggleRegister.bind(this);
    }

    toggleRegister = () => {
        this.setState(prevState => ({ show: !prevState.show }));
    }

    render() {
        return (
            <>
            <div id="login">
                <LoginCard toggleRegister = {() => this.toggleRegister()}/>
                <RegisterCard show={ this.state.show } toggleRegister = {() => this.toggleRegister()}/>
            </div>
            </>
        )
    }
}

export default Login;