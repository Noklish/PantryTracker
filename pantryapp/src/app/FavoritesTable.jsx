import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository } from './../api/repository';
import FavoriteModal from './modals/FavoriteModal';

export class FavoritesTable extends React.Component {
    repo = new repository();

    state = {
        tableList: []
    }


    render (){
        return (
            <>
            <div id="home">
                <h1 className="text-white">Favorites</h1>
                {!this.state.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any food items in your <b>Favorites</b>. Click 'Add Item' to begin filling your <b>Favorites</b>.
                </div>}
                {!!this.state.tableList.length && <table className="table table-light table-striped w-auto">
                    <thead>
                        <tr>
                            <th><button type="button" class="btn btn-link">Food Item <i className="fa fa-sort"></i></button></th>
                            <th>Brand <i className="fa fa-sort"></i></th>
                            <th>Food Type <i className="fa fa-sort"></i></th>
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
                                    <td>{a.quantity}</td>
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
                    <FavoriteModal repo={ this.repo } />
                }
                {!!this.state.tableList.length && <button type="button" className="btn btn-info btn-lg btn-block mt-1">
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