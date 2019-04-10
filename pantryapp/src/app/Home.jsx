import React, { Component } from 'react';
import Table from './Table';
import { FoodList } from './../models/foodList';
import RecipeTable from './RecipeTable'

export class Home extends React.Component {

    foodList = new FoodList;

    state = {
        pantry: true,
        grocery: false,
        favorites: false,
        recipies: false,
        titleText: 'Pantry',
        pantryList: [],
        groceryList: [],
        favoritesList: [],
        recipeList: []
    }

    onTogglePantry = () => {
        this.setState(state => ({ 
            pantry: true,
            grocery: false,
            favorites: false,
            recipies: false,
            titleText: 'Pantry'
        }));
    }

    onToggleGrocery = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: true,
            favorites: false,
            recipies: false,
            titleText: 'Grocery List'
        }));
    }

    onToggleFavorites = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: false,
            favorites: true,
            recipies: false,
            titleText: 'Favorites'
        }));
    }

    onToggleRecipies = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: false,
            favorites: false,
            recipies: true,
            titleText: 'Recipies'
        }));
    }



    onNewPantryItem(pantryItem){
        this.setState(state => {
            state.pantryList.push(pantryItem);
            return state;
        });
    }

    onNewGroceryItem(groceryItem){
        this.setState(state => {
            state.groceryList.push(groceryItem);
            return state;
        });
    }

    onNewFavoritesItem(favoritesItem){
        this.setState(state => {
            state.favoritesList.push(favoritesItem);
            return state;
        });
    }

    onNewRecipe(recipe){
        this.setState(state => {
            state.recipeList.push(recipe);
            return state;
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
                        <li className="nav-item">
                            <a className="nav-link text-light" onClick={this.onToggleRecipies} href="#">Recipies</a>
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
                {this.state.pantry && <Table title={this.state.titleText} onNewPantryItem={p => this.onNewPantryItem(p)} tableList={this.state.pantryList} quick={'Remove'}/>}
                {this.state.grocery && <Table title={this.state.titleText} onNewGroceryItem={g => this.onNewGroceryItem(g)} tableList={this.state.groceryList} quick={'Quick Add'}/>}
                {this.state.favorites && <Table title={this.state.titleText} onNewFavoritesItem={f => this.onNewFavoritesItem(f)} tableList={this.state.favoritesList} quick={'Quick Add'}/>}
                {this.state.recipies && <RecipeTable onNewRecipe={r => this.onNewRecipe(r)} recipies={this.state.recipeList} />}
            </main>
            </>
        );
    }
}

export default Home;
