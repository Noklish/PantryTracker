import React from 'react'
import './UpdateProfile.css';
import { repository } from '../api/repository';

export class UpdateProfile extends React.Component {
    repo = new repository();
    state = {
        username: '',
        oldPass: '',
        newPass: '',
        confirmPass: ''
    }    

    onUpdateProfile() {
        if(this.state.newPass === this.state.confirmPass){
            this.repo.changePassword(this.props.user.id, this.state.username, this.state.oldPass, this.state.newPass).then(resp => alert("Password has been reset")).then(resp => this.setState({
                username: '',
                oldPass: '',
                newPass: '',
                confirmPass: ''
            })).catch(err => alert(err));
        }
        else {
            alert("Passwords don't match");
        }
    }

    render() {
        return (
            <div className="updateProfile">
                <h1 className="text-white">Update Profile</h1>
                <div className="update">
                    <label htmlFor="username" className="text-white">Username</label>
                    <input  type="text"
                        name="username" 
                        id="username"
                        className="form-control"
                        placeholder="Enter new username"
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })} 
                        required/>
                </div>
                <div className="update">
                    <label htmlFor="passwordO" className="text-white">Password</label>
                    <input  type="password"
                        name="passwordO" 
                        id="passwordO"
                        className="form-control"
                        placeholder="Please enter old password"
                        value={this.state.oldPass}
                        onChange={e => this.setState({ oldPass: e.target.value })} 
                        required/>
                </div>
                <div className="update">
                    <input  type="password"
                        name="password" 
                        id="password"
                        className="form-control"
                        placeholder="Please enter new password"
                        value={this.state.newPass}
                        onChange={e => this.setState({ newPass: e.target.value })} 
                        required/>
                </div>
                <div className="update">
                    <input  type="password"
                        name="password2" 
                        id="password2"
                        className="form-control"
                        placeholder="Please confirm new password"
                        value={this.state.confirmPass}
                        onChange={e => this.setState({ confirmPass: e.target.value })} 
                        required/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button id="updateProfile" type="button" className="btn btn-primary" onClick={e => this.onUpdateProfile()}>Update</button>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({
            username: this.props.user.username
        });
    }
}

export default UpdateProfile;
