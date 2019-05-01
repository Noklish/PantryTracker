import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository } from './../api/repository';
import FavoriteModal from './modals/FavoriteModal';
import { Link } from 'react-router-dom';

export class FavoritesTable extends React.Component {
    repo = new repository();

    state = {
        tableList: [],
        id: ''
    }


   

    onAddToGrocery(foodId, quant){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.favoritesToGrocery(userId, foodId, quant)
        }
    }

    onAddAllToGrocery(){
        let userId = +this.props.match.params.userId;
        this.state.tableList.map((a) => {
            if(userId){
                this.repo.favoritesToGrocery(userId, a.foodID, a.minimumValue)
        }})
        
    }

    render (){
        return (
            <>
            <div id="home">
                <h1 className="text-white">Favorites</h1>
                {!this.state.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any food items in your <b>Favorites</b>. Add some items form your pantry to begin filling your <b>Favorites</b>.
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
                                    <td><button type="button" onClick={e => this.onAddToGrocery(a.foodID, a.minimumValue)}className="btn btn-secondary float-right" >Qucik Add</button></td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>}
                {!!this.state.tableList.length && <Link to={'/user/'+this.state.id+'/grocery-list'} type="button" className="btn btn-info btn-lg btn-block mt-1" onClick={e => this.onAddAllToGrocery()}>
                    Add all to your Grocery List
                </Link>}
            </div>
            </>
        );
    }

    componentDidMount(){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.getFavorites(userId).then(favorites => {
                this.setState(state => ({
                    tableList: favorites,
                    id: userId}));
            })
        }
    }


}

export default FavoritesTable;