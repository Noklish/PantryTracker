import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export const NavBar = (props) => (
    <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                    <div className="nav collapse navbar-collapse ">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link text-light" onClick={props.onToggleP} href="#">Pantry</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" onClick={props.onToggleG} href="#">Grocery</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" onClick={props.onToggleF} href="#">Favorites</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" onClick={props.onToggleR} href="#">Recipies</a>
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
                                    <a className="dropdown-item" onClick={props.onToggleUpdateP} href="#">Update Profile</a>
                                    <a className="dropdown-item" href="#">Change Profile</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
    </>
);

export default NavBar;