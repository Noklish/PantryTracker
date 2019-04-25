import React, { Component } from 'react';
import Table from './Table';
import { FoodList } from './../models/foodList';
import RecipeTable from './RecipeTable';
import FavoritesTable from './FavoritesTable';
import UpdateProfile from './UpdateProfile';
import NavBar from './NavBar';
import './Home.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export class Home extends React.Component {

    foodList = new FoodList;

    state = {
        pantry: true,
        grocery: false,
        favorites: false,
        recipies: false,
        updateAccount: false,
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
            updateAccount: false,
            titleText: 'Pantry'
        }));
    }

    onToggleGrocery = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: true,
            favorites: false,
            recipies: false,
            updateAccount: false,
            titleText: 'Grocery List'
        }));
    }

    onToggleFavorites = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: false,
            favorites: true,
            recipies: false,
            updateAccount: false,
            titleText: 'Favorites'
        }));
    }

    onToggleRecipies = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: false,
            favorites: false,
            recipies: true,
            updateAccount: false,
            titleText: 'Recipies'
        }));
    }

    onToggleUpdateProfile = () => {
        this.setState(state => ({ 
            pantry: false,
            grocery: false,
            favorites: false,
            recipies: false,
            updateAccount: true,
            titleText: 'Update Account'
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
            <div className="bg">
                <NavBar onToggleP={this.onTogglePantry}
                        onToggleG={this.onToggleGrocery}
                        onToggleF={this.onToggleFavorites}
                        onToggleR={this.onToggleRecipies}
                        onToggleUpdateP={this.onToggleUpdateProfile}
                        />
                <main>
                    {this.state.pantry && <Table title={this.state.titleText} onNewItem={p => this.onNewPantryItem(p)} page="Pantry" tableList={this.state.pantryList} quick={'Remove'}/>}
                    {this.state.grocery && <Table title={this.state.titleText} onNewItem={g => this.onNewGroceryItem(g)} page="Grocery" tableList={this.state.groceryList} quick={'Quick Add'}/>}
                    {this.state.favorites && <FavoritesTable onNewFavoritesItem={f => this.onNewFavoritesItem(f)} tableList={this.state.favoritesList} quick={'Quick Add'}/>}
                    {this.state.recipies && <RecipeTable onNewRecipe={r => this.onNewRecipe(r)} recipies={this.state.recipeList} />}
                    {this.state.updateAccount && <UpdateProfile />}
                </main>
            </div>
            </>
        );
    }
}

export default Home;
