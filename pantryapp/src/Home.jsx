import React, { Component } from 'react';
import PantryTable from './PantryTable';

export class Home extends React.Component {
    render (){
        return (
            <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="nav collapse navbar-collapse ">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#">Pantry</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#">Grocery</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#">Favorites</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                My Account
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Update Profile</a>
                                <a class="dropdown-item" href="#">Change Profile</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <body>
                <PantryTable></PantryTable>
            </body>
            </>
        );
    }
}

export default Home;