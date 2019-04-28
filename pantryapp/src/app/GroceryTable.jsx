import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository }  from './../api/repository';
import FavoriteModal from './modals/FavoriteModal';
import ExpirationModal from './modals/ExpirationModal';

export class GroceryTable extends React.Component {
    repo = new repository();

    state = {
        tableList: []
    }

    onAddItemBase(s) {
        
        // if(s.food == ''){
        //     return false;
        // }
        // if(brand == ''){
        //     brand = 'N/A';
        // }
        // if(type == ''){
        //     type = 'N/A';
        // }

        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.addGroceryItem(userId, s.food, s.type, s.brand, s.quantity).then(state => {
                this.setState(state => ({
                    food: '',
                    brand: '',
                    type: '',
                    quantity: 1}));
            })
        }
    }

    render (){
        return (
            <>
            <div id="home">
                <h1 className="text-white">Grocery List</h1>
                {!this.state.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any food items in your <b>Grocery List</b>. Click 'Add Item' to begin filling your <b>Grocery List</b>.
                </div>}
                {!!this.state.tableList.length && <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <th><button type="button" className="btn btn-link">Food Item <i className="fa fa-sort"></i></button></th>
                            <th>Brand <i className="fa fa-sort"></i></th>
                            <th>Food Type <i className="fa fa-sort"></i></th>
                            <th>Quantity</th>
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
                                    <td><button type="button" className="btn btn-secondary float-right" data-toggle="modal" data-target="#expiration">Quick Add</button>{ <ExpirationModal repo={this.repo}/>}</td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>}
                
                <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your GroceryList
                </button>
                {
                    <FavoriteModal onAddItemBase={e => this.onAddItemBase(e)} repo={ this.repo } />
                }
                {!!this.state.tableList.length && <button type="button" className="btn btn-info btn-lg btn-block mt-1">
                    Add all to your Pantry
                </button>}
            </div>
            </>
        );
    }

    componentDidMount(){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.getGroceryList(userId).then(groceryList => {
                this.setState(state => ({
                    tableList: groceryList}));
            })
        }
    }
}

export default GroceryTable;