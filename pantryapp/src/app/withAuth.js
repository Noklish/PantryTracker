import React, {Component} from 'react';
import AuthService from './../AuthService';
import { Redirect } from 'react-router-dom';

export const withAuth = (AuthComponent) => {
    const auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor(props){
            super(props);
            this.state = {
                user: '',
                redirect: ''
            }
        }

        componentWillMount(){
            debugger;
            if(!auth.loggedIn()){
                this.setState({ redirect: '/login' });
            }
            else {
                try {
                    const profile = auth.getProfile();
                    this.setState({
                        user: profile,
                        redirect: `/user/${profile.id}/pantry`
                    });
                } catch(err){
                    auth.logout();
                    this.setState({ redirect: '/login' });
                }
            }
        }

        componentDidUpdate(prevProps){
            if(this.props.user !== prevProps.user)
            {
                if(!auth.loggedIn()){
                    alert("We're sorry, there was an error logging in. Please try again.");
                    this.setState({ redirect: '/login' });
                }
                else {
                    try {
                        const profile = auth.getProfile();
                        this.setState({
                            user: profile,
                            redirect: `/user/${profile.id}/pantry`
                        });
                    } catch(err){
                        auth.logout();
                        this.setState({ redirect: '/login' });
                    }
                }
            }
        }

        render(){
            return <AuthComponent user={this.state.user} /> 
        }
    }
}

export default withAuth;