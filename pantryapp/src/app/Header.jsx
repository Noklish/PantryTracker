import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export const Header = (props) => (
//   <nav className="navbar navbar-dark bg-dark">
//        <Link to='/' className="navbar-brand text-white">Store</Link>
//   </nav>
    // <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    //     <div className="nav collapse navbar-collapse ">
    //         <ul className="navbar-nav">
    //             <li className="nav-item active">
    //                 <a className="nav-link text-light" onClick={this.onTogglePantry} href="#">Pantry</a>
    //             </li>
    //             <li className="nav-item">
    //                 <a className="nav-link text-light" onClick={this.onToggleGrocery} href="#">Grocery</a>
    //             </li>
    //             <li className="nav-item">
    //                 <a className="nav-link text-light" onClick={this.onToggleFavorites} href="#">Favorites</a>
    //             </li>
    //             <li className="nav-item">
    //                 <a className="nav-link text-light" onClick={this.onToggleRecipies} href="#">Recipies</a>
    //             </li>
    //         </ul>
    //     </div>
    //     <div>
    //         <ul className="navbar-nav">
    //             <li className="nav-item dropdown">
    //                 <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                     My Account
    //                 </a>
    //                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    //                     <a className="dropdown-item" onClick={this.onToggleUpdateProfile} href="#">Update Profile</a>
    //                     <a className="dropdown-item" href="#">Change Profile</a>
    //                     <div className="dropdown-divider"></div>
    //                     <a className="dropdown-item" href="#">Logout</a>
    //                 </div>
    //             </li>
    //         </ul>
    //     </div>
    // </nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Disabled</a>
                </li>
            </ul>
        </div>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
             <ul className="navbar-nav">
                 <li className="nav-item dropdown">
                     <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         My Account
                     </a>
                     <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                         <a className="dropdown-item" href="#">Update Profile</a>
                         <a className="dropdown-item" href="#">Change Profile</a>
                         <div className="dropdown-divider"></div>
                         <a className="dropdown-item" href="#">Logout</a>
                     </div>
                 </li>
             </ul>
         </div>
    </nav>
);