import React, { Component } from 'react';

import { LoginCard } from './LoginCard';
import { RegisterCard } from './RegisterCard';
import { Redirect } from 'react-router-dom';
import { AuthService } from './../AuthService';
import './loginCard.css';

export class Login extends React.Component {
    constructor (props) {
        super(props);


        this.state = {
            show: false,
            redirect: ''
        }

        this.toggleRegister = this.toggleRegister.bind(this);
        this.auth = new AuthService();
    }

    toggleRegister = () => {
        this.setState(prevState => ({ show: !prevState.show }));
    }

    changeRedirect(id){
        debugger;
        console.log("change Redirect");
        this.setState({
            redirect: '/home'
        });
        this.props.onLogin();
    }

    componentWillMount(){
        if(this.auth.loggedIn()){
            //debugger;
            let path = `/user/${this.auth.getProfile().id}/pantry`;
            this.setState({ redirect: path });
        }
    }

    render() {
        debugger;
        console.log("Login render");
        if(this.state.redirect){
            return <Redirect to={{ pathname: this.state.redirect }}/>
        }
        return (
            <>
            <div id="login">
                <LoginCard auth = {this.auth} toggleRegister = {() => this.toggleRegister()} changeRedirect={e => this.changeRedirect(e)} user={this.props.user}/>
                <RegisterCard auth = {this.auth} show={ this.state.show } toggleRegister = {() => this.toggleRegister()} changeRedirect={e => this.changeRedirect(e)} user={this.props.user}/>
            </div>
            </>
        )
    }
}

export default Login;