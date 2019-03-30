import React, { Component } from 'react';

import { LoginCard } from './LoginCard'
import { RegisterCard } from './RegisterCard'

export class Login extends React.Component {
    constructor (props) {
        super(props);


        this.state = {
            show: true
        }

        this.toggleRegister = this.toggleRegister.bind(this);
    }

    toggleRegister = () => {
        this.setState(prevState => ({ show: !prevState.show }));
    }

    render() {
        return (
            <>
                <LoginCard/>
                <RegisterCard/>
                <button onClick={this.toggleRegister}>Reg</button>
            </>
        )
    }
}

export default Login;