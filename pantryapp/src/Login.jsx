import React, { Component } from 'react';

import { LoginCard } from './LoginCard'
import { RegisterCard } from './RegisterCard'

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
                <LoginCard toggleRegister = {() => this.toggleRegister()}/>
                <RegisterCard show={ this.state.show } toggleRegister = {() => this.toggleRegister()}/>
            </>
        )
    }
}

export default Login;