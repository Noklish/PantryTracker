import React, { Component } from 'react';

export class Home extends React.Component {
    render (){
        return (
            <nav>
                <div class="dropdown">
                    <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        My Account
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Update Profile</a>
                        <a class="dropdown-item" href="#">Change Profile</a>
                    <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Logout</a>
                    </div>
                    <div class="clear"></div>
                    </div>
    
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home">Pantry</a></li>
                    <li><a data-toggle="tab" href="#menu1">Grocery</a></li>
                    <li><a data-toggle="tab" href="#menu2">Favorites</a></li>
                </ul>
      
                <div class="clear"></div>
            </nav>
        );
    }
}

export default Home;