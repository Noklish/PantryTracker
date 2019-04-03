import React, { Component } from 'react';
import Table from './Table';

export class Home extends React.Component {

    state = {
        pantry: true,
        grocery: false,
        favorites: false,
        hideTable: false,
        titleText: 'Pantry',
        pantryList: [],
        groceryList: [],
        favoritesList: []
     }

    onTogglePantry = () => {
        this.setState(state => ({ 
            pantry: true,
            grocery: false,
            favorites: false,
            titleText: 'Pantry'
        }));
    }

    onToggleGrocery = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: true,
            favorites: false,
            titleText: 'Grocery List'
        }));
    }

    onToggleFavorites = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: false,
            favorites: true,
            titleText: 'GroceryList'
        }));
    }
    
    onNewPantryItem(pantryItem){
        this.setState(state => {
            state.pantryList.push(pantryItem);
        });
    }

    onNewGroceryItem(groceryItem){
        this.setState(state => {
            state.groceryList.push(groceryItem);
        });
    }

    onNewFavoritesItem(favoritesItem){
        this.setState(state => {
            state.favoritesList.push(favoritesItem);
        });
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
            <main>
                {this.state.pantry && <Table title={this.state.titleText} onNewPantryItem={p => this.onNewPantryItem(p)} quick={'Remove'}/>}
                {this.state.grocery && <Table title={this.state.titleText} onNewGroceryItem={g => this.onNewGroceryItem(g)} quick={'Quick Add'}/>}
                {this.state.favorites && <Table title={this.state.titleText} onNewFavoritesItem={f => this.onNewFavoritesItem(f)} quick={'Quick Add'}/>}
            </main>
            </>
        );
    }
}

export default Home;