import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository }  from './../api/repository';
import FavoriteModal from './modals/FavoriteModal';
import ExpirationModal from './modals/ExpirationModal';
import { Link } from 'react-router-dom';

export class GroceryTable extends React.Component {
    repo = new repository();

    state = {
        tableList: [],
        id: '',
        quickAddItem: ''
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

    onQuickAdd(food){
        this.setState({
            quickAddItem: food
        })
    }

    removeFromTable(foodId){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.deleteGroceryItem(userId, foodId).then(() => {
                this.setState(state => ({
                    tableList: state.tableList.filter(x => x.foodID !== foodId),
                }))
            })
        }
    }

    addExpiration(expiration){
        this.repo.groceryToPantry(this.state.id, this.state.foodId, expiration, this.state.quant).then(() => {
            this.setState(state => ({
                foodId: '',
                quant: ''
            }))
        })
    }

    onAddAllToPantry(){
        this.state.tableList.map((a) => {
                this.repo.groceryToPantry(this.state.id, a.foodID, '', a.quantity)
                this.repo.deleteGroceryItem(this.state.id, a.foodID).then(() => {
                    this.setState(state => ({
                        tableList: state.tableList.filter(x => x.foodID !== a.foodID)
                    }))
                }) 
        })
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
                                    <td><button type="button" className="btn btn-secondary float-right" data-toggle="modal" data-target="#expiration" onClick={e => this.onQuickAdd(a)}>Quick Add</button></td>
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
                <ExpirationModal repo={this.repo} user={this.state.id} quickAddItem={this.state.quickAddItem} removeFromTable={e => this.removeFromTable(e)}/>
                {!!this.state.tableList.length && <button type="button" className="btn btn-info btn-lg btn-block mt-1" onClick={e => this.onAddAllToPantry()}>
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
    }
}

export default GroceryTable;
