import React from 'react'
import './UpdateProfile.css';

export class UpdateProfile extends React.Component {

    state = {
        first: '',
        last: '',
        password: ''
    }    

    updateProfile() {
        alert("Hello");
    }

    render() {
        return (
            <div className="updateProfile">
                <h1>Update Profile</h1>
                <div className="update">
                    <label htmlFor="firstName">First Name</label>
                    <input  type="text"
                        name="firstName" 
                        id="firstName"
                        className="form-control"
                        placeholder="Please Enter First Name"
                        value={this.state.first}
                        onChange={e => this.setState({ first: e.target.value })} 
                        required/>
                </div>
                <div className="update">
                    <label htmlFor="lastName">Last Name</label>
                    <input  type="text"
                        name="lastName" 
                        id="lastName"
                        className="form-control"
                        placeholder="Please Enter Last Name"
                        value={this.state.last}
                        onChange={e => this.setState({ last: e.target.value })} 
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
                    <button id="updateProfile" type="button" className="btn btn-primary" onClick={e => this.updateProfile()}>Update</button>
                </div>
            </div>
        )
    }
}

export default UpdateProfile;
