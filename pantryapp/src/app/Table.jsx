import React, { Component } from 'react';
import { FoodList } from './../models/foodList';

export class Table extends React.Component {
    
    state = {
        food: '',
        brand: '',
        type: '',
        date: '',
        quantity: 1,
        temp: []
    }

    onAddItem() {
        if(this.props.title == 'Pantry') {
            this.props.onNewPantryItem(new FoodList(this.state.food, this.state.brand, this.state.type, this.state.date, this.state.quantity))
        } else if(this.props.title == 'Grocery List'){
            this.props.onNewGroceryItem(new FoodList(this.state.food, this.state.brand, this.state.type, this.state.date, this.state.quantity))
        } else if(this.props.title == 'Favorites'){
            this.props.onNewFavoritesItem(new FoodList(this.state.food, this.state.brand, this.state.type, this.state.date, this.state.quantity))
        }
    }

    checkExpiration(date) {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        var splitDate = date.split("-");

        if(year > splitDate[0]){
            return <td className="text-danger">Expired</td>;
        }
        
        if(month > splitDate[1]){
            return <td className="text-danger">Expired</td>;
        }

        if(day > splitDate[2]){
            return <td className="text-danger">Expired</td>;
        }

        return splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0];
        
    }

    render (){
        return (
            <>
            <div id="home">
                <h1>{this.props.title}</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Brand</th>
                            <th>Food Type</th>
                            <th>Expiration Date</th>
                            <th>Quantity</th>
                            <th className="text-right">{this.props.quick}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.tableList.map((a, i) => 
                                <tr key={i}>
                                    <td>{a.food}</td>
                                    <td>{a.brand}</td>
                                    <td>{a.type}</td>
                                    {this.checkExpiration(a.expire)}
                                    <td>{a.quantity}</td>
                                    <td><button type="button" className="btn btn-secondary float-right" >{this.props.quick}</button></td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your {this.props.title}
                </button>
                <div className="modal fade" id="foodEntry" tabIndex="-1" role="dialog" aria-labelledby="foodEntryLable" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="foodEntryLable">Add Food Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <form name="foodEntryForm" id="foodEntryForm">
                                    
                                    <div className="form-group">
                                        <label htmlFor="foodItem">Food Item</label>
                                        <input  type="text"
                                                name="foodItem" 
                                                id="foodItem"
                                                className="form-control"
                                                placeholder="Please Enter Food Item"
                                                value={this.state.food}
                                                onChange={e => this.setState({ food: e.target.value })} 
                                                required/>
                                        <div className="invalid-feedback">Please enter food item</div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="foodBrand">Food Brand</label>
                                        <input  type="text"
                                                name="foodBrand"
                                                id="foodBrand"
                                                className="form-control"
                                                placeholder="Please Enter the Brand of the Food"
                                                value={this.state.brand}
                                                onChange={e => this.setState({ brand: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="foodType">Food Type</label>
                                        <select className= "form-control"
                                                name="foodType"
                                                id="foodType"
                                                value={this.state.type}
                                                onChange={e => this.setState({ type: e.target.value })} >
                                            <option value="N/A">Please select food type</option>
                                            <option value="Grains">Grains</option>
                                            <option value="Fruits">Fruits</option>
                                            <option value="Vegetables">Vegetables</option>
                                            <option value="Dairy">Dairy</option>
                                            <option value="Meat">Meat</option>
                                            <option value="Beverage">Beverage</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="expirationDate">Expiration Date</label>
                                        <input  type="date" 
                                                name="expirationDate"
                                                id="expirationDate"
                                                className="form-control"
                                                placeholder="Please Enter Expiration Date"
                                                value={this.state.date}
                                                onChange={e => this.setState({ date: e.target.value })} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input  type="number"
                                                name="quantity" 
                                                id="quantity" 
                                                className="form-control" 
                                                min="1"
                                                placeholder="Please enter the Quantity of Food"
                                                value={this.state.quantity}
                                                onChange={e => this.setState({ quantity: e.target.value })} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button id="addCourse" type="button" className="btn btn-primary" onClick={e => this.onAddItem()} data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Table;