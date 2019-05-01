import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository }  from './../api/repository';
import FavoriteModal from './modals/FavoriteModal';
import ExpirationModal from './modals/ExpirationModal';

export class GroceryTable extends React.Component {
    repo = new repository();

    state = {
        tableList: [],
        id: ''
    }

    onAddItemBase(s) {
        let id = +this.props.match.params.userId;
        if(id){
            this.repo.addGroceryItem(id, String(s.food).toLowerCase(), String(s.type).toLowerCase(), String(s.brand).toLowerCase(), s.quantity)
            this.repo.getGroceryList(id).then(groceryList => {
                this.setState(state => ({
                    tableList: groceryList
                    }));
            })          
        }
    }

    onQuickAdd(id){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.deleteGroceryItem(userId, id).then(() => {
                this.setState(state => ({
                    tableList: state.tableList.filter(x => x.foodID !== id)
                }))
            })
        }
    }

    onAddAllToPantry(){
        let userId = +this.props.match.params.userId;
        this.state.tableList.map((a) => {
            if(userId){
                this.repo.deleteGroceryItem(userId, a.foodID).then(() => {
                    this.setState(state => ({
                        tableList: state.tableList.filter(x => x.foodID !== a.id)
                    }))
                })
                this.repo.groceryToPantry(userId, a.foodID, '', a.quantity)
        }})
        
        

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
                            <th>Food Item</th>
                            <th>Brand</th>
                            <th>Food Type</th>
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
                                    <td><button type="button" className="btn btn-secondary float-right" data-toggle="modal" data-target="#expiration" onClick={e => this.onQuickAdd(a.foodID)}>Quick Add</button>{ <ExpirationModal repo={this.repo} userId={this.state.id} foodId={a.foodID} quant={a.quantity} />}</td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>}
                
                <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your Grocery List
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
                    tableList: groceryList,
                    id: userId}));
            })
        }
        //debugger;
    }
}

export default GroceryTable;