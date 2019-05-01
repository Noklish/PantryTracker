import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository } from './../api/repository';
import FavoriteModal from './modals/FavoriteModal';

export class FavoritesTable extends React.Component {
    repo = new repository();

    state = {
        tableList: []
    }


    onAddItemBase(food, type, brand, quantity) {
        
        // if(food == ''){
        //     return false;
        // }
        // if(brand == ''){
        //     brand = 'N/A';
        // }
        // if(type == ''){
        //     type = 'N/A';
        // }

        // let userId = +this.props.match.params.userId;
        // if(userId){
        //     this.repo.addGroceryItem(userId, food, type, brand, quantity).then(state => {
        //         this.setState(state => ({
        //             food: '',
        //             brand: '',
        //             type: '',
        //             quantity: 1}));
        //     })
        // }
    }

    onAddToGrocery(){
        debugger;
        let userId = +this.props.match.params.userId;
        this.state.tableList.map((a) => {
            if(userId){
                this.repo.addGroceryItem(userId, a.foodName.toLowerCase(), a.foodGrouptoLowerCase(), a.brandtoLowerCase(), a.minimumValuetoLowerCase())
        }})
    }

    render (){
        return (
            <>
            <div id="home">
                <h1 className="text-white">Favorites</h1>
                {!this.state.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any food items in your <b>Favorites</b>. Click 'Add Item' to begin filling your <b>Favorites</b>.
                </div>}
                {!!this.state.tableList.length && <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Brand</th>
                            <th>Food Type</th>
                            <th>Desired Quantity</th>
                            <th className="text-right">Quick Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableList.map((a, i) => 
                                <tr key={i}>
                                    <td>{a.foodName}</td>
                                    <td>{a.brand}</td>
                                    <td>{a.foodGroup}</td>
                                    <td>{a.minimumValue}</td>
                                    <td><button type="button" className="btn btn-secondary float-right" >Qucik Add</button></td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>}
                
                <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your Favorites
                </button>
                {
                    <FavoriteModal onAddItemBase={e => this.onAddItemBase(e)} repo={ this.repo } />
                }
                {!!this.state.tableList.length && <button type="button" className="btn btn-info btn-lg btn-block mt-1" onClick={e => this.onAddToGrocery()}>
                    Add all to your Grocery List
                </button>}
            </div>
            </>
        );
    }

    componentDidMount(){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.getFavorites(userId).then(favorites => {
                this.setState(state => ({
                    tableList: favorites}));
            })
        }
    }


}

export default FavoritesTable;