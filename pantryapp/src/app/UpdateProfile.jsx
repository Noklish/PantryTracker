import React from 'react'
import './UpdateProfile.css';

export class UpdateProfile extends React.Component {

    state = {
        username: '',
        password: ''
    }    

    updateProfile() {

    }

    render() {
        return (
            <div className="updateProfile">
                <h1 className="update-header">Update Profile</h1>
                <div className="update">
                    <label htmlFor="firstName">First Name</label>
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
                    <label htmlFor="password">Password</label>
                    <input  type="text"
                        name="password" 
                        id="password"
                        className="form-control"
                        placeholder="Please Enter New Password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })} 
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
        debugger;
        this.setState({
            username: this.props.user.username
        });
    }
}

export default UpdateProfile;
