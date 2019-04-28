import React, { Component } from 'react';
import Table from './Table';
import { FoodList } from './../models/foodList';
import RecipeTable from './RecipeTable';
import UpdateProfile from './UpdateProfile';
import { Link } from 'react-router-dom';

import './Home.css';


export class Home extends React.Component {

    foodList = new FoodList;

    state = {
        
    }

    render (){
        return (
            <>

            <main>
                <h1 className="text-white">Welcome back [User]! Please enjoy your expirence!</h1>
            </main>
            </>
        );
    }
}

export default Home;
