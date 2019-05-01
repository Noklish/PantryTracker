import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './loginCard.css';
import { repository } from '../api/repository';
import { Redirect, Link } from 'react-router-dom';

export class LoginCard extends React.Component{
    repo = new repository();
    constructor(props){
        super(props);

        this.state = {
            email: "",
            pass: "",
            remember: false,
            redirect: ''
        }
    }

    validateLogin(e){
        if(this.state.remember){
            localStorage.setItem("RememberEmail",this.state.email);
            localStorage.setItem("RememberPassword",this.state.pass);
        }
        else if(!this.state.remember && localStorage.getItem("RememberEmail")){ //wants to be forgotten
            localStorage.removeItem("RememberEmail");
            localStorage.removeItem("RememberPassword");
        }
        this.props.auth.login(this.state.email, this.state.pass).then(res => this.props.changeRedirect(res.userid)).catch(err => alert(err));
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={{pathname: this.state.redirect}} />
        }
        else {
            return(
                <>
                <Card className="text-center" id="loginCard">
                    <Card.Header id="logHead">
                        <h4>Login</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlid="login.email">
                                <Form.Control type="email" placeholder="email" value={ this.state.email } onChange={ e => this.setState({ email: e.target.value })}></Form.Control>
                            </Form.Group>
                            <Form.Group controlid="login.pass">
                                <Form.Control type="password" placeholder="password" value={ this.state.pass } onChange={ e => this.setState({ pass: e.target.value })}></Form.Control>
                            </Form.Group>
                            <Form.Group controlid="login.stay">
                                <Form.Check type="checkbox" label="Remember me" defaultChecked={this.state.remember} value={this.state.remember} onChange={ e => this.setState(state => ({ remember: !state.remember })) }/>
                            </Form.Group>
                        </Form>
                        <Form.Group controlid="login.submit">
                            <Link to='/home' className="btn btn-success btn-block" onClick={ e => this.validateLogin(e) }>Login</Link>
                        </Form.Group>
                        <hr/>
                        <Form.Group controlid="login.register">
                            <Button block className="btn-primary" onClick={ e => this.props.toggleRegister() }>Register</Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
                </>
            )
        }
    }

    componentDidMount(){
        if(localStorage.getItem("RememberEmail")){
            console.log(localStorage.getItem("RememberEmail"));
            this.setState({
                email: localStorage.getItem("RememberEmail"),
                pass: localStorage.getItem("RememberPassword"),
                remember: true
            });
        }
    }
}

export default LoginCard;