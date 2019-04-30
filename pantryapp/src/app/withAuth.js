import React, {Component} from 'react';
import AuthService from './../AuthService';
import { Redirect } from 'react-router-dom';

export const withAuth = (AuthComponent) => {
    const auth = new AuthService();
    return class AuthWrapped extends Component {
        debugger;
        constructor(props){
            super(props);
            this.state = {
                user: '',
            }
        }

        componentWillMount(){
            if(!auth.loggedIn()){
                this.props.history.replace('/login');
            }
            else {
                try {
                    const profile = auth.getProfile();
                    this.setState({
                        user: profile
                    });
                } catch(err){
                    auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }

        render(){
            if(this.state.user){
                return(
                    <AuthComponent history = {this.props.history} user={this.state.user} /> 
                )
            }
            else {
                return null;
            }
        }
    }
}

export default withAuth;