import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export const Header = (props) => (
//   <nav className="navbar navbar-dark bg-dark">
//        <Link to='/' className="navbar-brand text-white">Store</Link>
//   </nav>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="nav collapse navbar-collapse ">
        <ul className="navbar-nav">
            <li className="nav-item active">
                {/* <a className="nav-link text-light" onClick={this.onTogglePantry} href="#">Pantry</a> */}
                <Link to='/pantry' className="nav-link text-light">Pantry</Link>
            </li>
            <li className="nav-item">
                {/* <a className="nav-link text-light" onClick={this.onToggleGrocery} href="#">Grocery</a> */}
                <Link to='/grocery-list' className="nav-link text-light">Grocery List</Link>
            </li>
            <li className="nav-item">
                {/* <a className="nav-link text-light" onClick={this.onToggleFavorites} href="#">Favorites</a> */}
                <Link to='/favorites' className="nav-link text-light">Favorites</Link>
            </li>
            <li className="nav-item">
                {/* <a className="nav-link text-light" onClick={this.onToggleRecipies} href="#">Recipies</a> */}
                <Link to='/recipies' className="nav-link text-light">Recipies</Link>
            </li>
        </ul>
    </div>
    <div>
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {/* <a className="dropdown-item" onClick={this.onToggleUpdateProfile} href="#">Update Profile</a> */}
                    <Link to='/update-profile' className="dropdown-item">Update Profile</Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Logout</a>
                </div>
            </li>
        </ul>
    </div>
    </nav>
);