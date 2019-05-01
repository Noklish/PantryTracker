import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository }  from './../api/repository';
import FoodItemModal from './modals/FoodItemModal';
import { Link } from 'react-router-dom';
import { UpdateFoodModal } from './modals/UpdateFoodModal';
import { AddToFavModal } from './modals/addToFavModal';

export class PantryTable extends React.Component {
    repo = new repository();

    state = {
        tableList: [],
        id: '',
        favId: '',
        updateItem: ''
    }

    onAddItemBase(s) {
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.addPantryItem(userId, s.food, s.type, s.brand, s.quantity, s.date, "This is a Description")
            this.repo.getPantry(userId).then(pantry => {
                this.setState(state => ({
                    tableList: pantry}));
            })
        }
    }

    onDeleteFood(deleteId, deleteName){
        let userId = +this.props.match.params.userId;
        if(window.confirm(`Are you sure you want to delete ${deleteName}?`)){
            if(userId){
                this.repo.deletePantryItem(userId, deleteId).then(() => {
                    this.setState(state => ({
                        tableList: state.tableList.filter(x => x.foodID !== deleteId)
                    }))
                })
            }
        }
    }

    checkExpiration(date) {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        if(date == 'N/A'){
            return <td>{date}</td>;
        }

        var prettyDate = date.substring(0,10);

        
        var splitDate = prettyDate.split("-");
        if(splitDate[0] == '0000' && splitDate[1] == '00' && splitDate[2] == '00'){
            return <td>N/A</td>   
        }

        if(year > splitDate[0]){
            return <td className="text-danger">Expired</td>;
        }
        
        if(year == splitDate[0] && month > splitDate[1]){
            return <td className="text-danger">Expired</td>;
        }

        if(month == splitDate[1] && day > splitDate[2]){
            return <td className="text-danger">Expired</td>;
        }

        if(month == splitDate[1] && (splitDate[2] - day) <= 5){
            return <td className="text-warning">{splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0]}</td>;
        }

        if(month != splitDate[1] && ((splitDate[2]+30) - day) <= 5){
            return <td className="text-warning">{splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0]}</td>;
        }

        return <td>{splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0]}</td>;
    }

    sortCategory(){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.sortByCategories(userId).then(table => {
                this.setState({
                    tableList: table
                });
            })
        }
    }

    sortExpiration(){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.sortByExpiration(userId).then(table => {
                this.setState({
                    tableList: table
                });
            })
        }
    }

    onAddtoFavorites(foodId){
        this.setState({
            favId: foodId
        });
    }

    onUpdateItem(food){
        this.setState({
            updateItem: food
        });
    }

    render (){
        debugger;
        return (
            <>
            <div id="home">
                <h1 className="text-white">Pantry</h1>
                {!this.state.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any food items in your <b>Pantry</b>. Click 'Add Item' to begin filling your <b>Pantry</b>.
                </div>}
                {!!this.state.tableList.length && <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Brand</th>
                            <th><button className="btn btn-link" onClick={e => this.sortCategory()}>Food Type <i className="fa fa-sort"></i></button></th>
                            <th><button className="btn btn-link" onClick={e => this.sortExpiration()}>Expiration Date <i className="fa fa-sort"></i></button></th>
                            <th>Quantity</th>
                            <th className="text-right">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableList.map((a, i) => 
                                <tr key={i}>
                                    {/* <td><button type="link" data-toggle="modal" data-target="#update">{a.foodName}</button></td> */}
                                    {/* {
                                        <UpdateFoodModal favorites={this.state.favoriteList} foodId={a.foodID} userId={this.state.id}/>
                                    } */}
                                    <td>{a.foodName}</td>
                                    <td>{a.brand}</td>
                                    <td>{a.foodGroup}</td>
                                    {this.checkExpiration(a.expirationDate)}
                                    <td>{a.quantity}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-md float-right" onClick={e => this.onDeleteFood(a.foodID, a.foodName)}><i className="fa fa-trash"></i></button>
                                        <button type="button" className="btn btn-warning btm-sm float-right" onClick={e => this.onAddtoFavorites(a.foodID)} data-toggle="modal" data-target="#toFav"><i className="fa fa-star"></i></button>
                                        <button type="button" className="btn btn-secondary btm-sm float-right" onClick={e => this.onUpdateItem(a)} data-toggle="modal" data-target="#update"><i className="fa fa-edit"></i></button>
                                    </td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>}
                
                <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your Pantry
                </button>
                {
                    <FoodItemModal repo={ this.repo }  onAddItemBase={e => this.onAddItemBase(e)}/>
                }
                {
                    <AddToFavModal repo={ this.repo } user={this.props.user} id={this.state.favId}/>
                }
                <UpdateFoodModal repo={ this.repo } user={this.props.user} updateItem={this.state.updateItem} updateItem={this.state.updateItem}/>
            </div>
            </>
        );
    }

    componentDidMount(){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.getPantry(userId).then(pantry => {
                this.setState(state => ({
                    tableList: pantry,
                    id: userId}));
            })
        }
    }
}

export default PantryTable;