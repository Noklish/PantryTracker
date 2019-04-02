import React, { Component } from 'react';
import Table from './Table';

export class Home extends React.Component {

    state = {
        hideMessage: false,
        pantry: false,
        grocery: false,
        favorites: false,
        page: 'pantry',

     }

     onTogglePantry = () => {
        this.setState(prevState => ({ pantry: true }));
        this.setState(prevState => ({ grocery: false }));
        this.setState(prevState => ({ favorites: false }));
      }

      onToggleGrocery = () => {
        this.setState(prevState => ({ pantry: false }));
        this.setState(prevState => ({ grocery: true }));
        this.setState(prevState => ({ favorites: false }));
      }

      onToggleFavorites = () => {
        this.setState(prevState => ({ pantry: false }));
        this.setState(prevState => ({ grocery: false }));
        this.setState(prevState => ({ favorites: true }));
      }


    render (){
        return (
            <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="nav collapse navbar-collapse ">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link text-light" onClick={this.onTogglePantry} href="#">Pantry</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" onClick={this.onToggleGrocery} href="#">Grocery</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" onClick={this.onToggleFavorites} href="#">Favorites</a>
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
                                <a className="dropdown-item" href="#">Update Profile</a>
                                <a className="dropdown-item" href="#">Change Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>
                {this.state.pantry && <Table title={'Pantry'} />}
                {this.state.grocery && <Table title={'Grocery List'}/>}
                {this.state.favorites && <Table title={'Favorites'}/>}
            </div>
            </>
        );
    }
}

export default Home;