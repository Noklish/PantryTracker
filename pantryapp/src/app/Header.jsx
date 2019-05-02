import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="nav collapse navbar-collapse">

            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to={`/user/${props.user.id}/pantry`} className="nav-link text-light">Pantry</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/user/${props.user.id}/grocery-list`} className="nav-link text-light">Grocery List</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/user/${props.user.id}/favorites`} className="nav-link text-light">Favorites</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/user/${props.user.id}/recipes`} className="nav-link text-light">Recipies</Link>
                </li>
            </ul>
        </div>
        <div className="link-appear nav-item dropdown">
            <div className="dropdown">
            <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Explore
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={`/user/${props.user.id}/pantry`} className="dropdown-item">Pantry</Link>
                <Link to={`/user/${props.user.id}/grocery-list`} className="dropdown-item">Grocery List</Link>
                <Link to={`/user/${props.user.id}/favorites`} className="dropdown-item">Favorites</Link>
                <Link to={`/user/${props.user.id}/recipes`} className="dropdown-item">Recipies</Link>
            </div>
            </div>
        </div>
        <div>
            <div className="dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to={`/user/${props.user.id}/update-profile`} className="dropdown-item">Update Profile</Link>
                    <div className="dropdown-divider"></div>
                    <Link to='/login' className="dropdown-item" onClick={e => props.handleLogout(e)}>Logout</Link>
                </div>
            </div>
        </div>
    
    </nav>
);
