import React, { Component } from 'react';
import { FoodList } from './../models/foodList';

export class GroceryTable extends React.Component {
    
    state = {
        food: '',
        brand: '',
        type: '',
        date: '',
        quantity: 1
    }

    onAddItem() {
        var sendBrand = 'N/A';
        var sendType = 'N/A';
        var sendDate = 'N/A';

        if(this.state.brand != ''){
            sendBrand = this.state.brand;
        }
        if(this.state.type != ''){
            sendType = this.state.type;
        }
        if(this.state.date != ''){
            sendDate = this.state.date;
        }

        if(this.props.title == 'Pantry') {
            this.props.onNewPantryItem(new FoodList(this.state.food, sendBrand, sendType, sendDate, this.state.quantity))
        } else if(this.props.title == 'Grocery List'){
            this.props.onNewGroceryItem(new FoodList(this.state.food, sendBrand, sendType, sendDate, this.state.quantity))
        } else if(this.props.title == 'Favorites'){
            this.props.onNewFavoritesItem(new FoodList(this.state.food, sendBrand, sendType, sendDate, this.state.quantity))
        }
        this.setState(state => ({
            food: '',
            brand: '',
            type: '',
            date: '',
            quantity: 1
          }));
    }

    render (){
        return (
            <>
            <div id="home">
                <h1 className="text-white">Grocery List</h1>
                {!this.props.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any food items in your <b>Grocery List</b>. Click 'Add Item' to begin filling your <b>Grocery List</b>.
                </div>}
                {!!this.props.tableList.length && <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <th><button type="button" class="btn btn-link">Food Item <i className="fa fa-sort"></i></button></th>
                            <th>Brand <i className="fa fa-sort"></i></th>
                            <th>Food Type <i className="fa fa-sort"></i></th>
                            <th>Quantity</th>
                            <th className="text-right">Qucik Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.tableList.map((a, i) => 
                                <tr key={i}>
                                    <td>{a.food}</td>
                                    <td>{a.brand}</td>
                                    <td>{a.type}</td>
                                    <td>{a.quantity}</td>
                                    <td><button type="button" className="btn btn-secondary float-right" >{this.props.quick}</button></td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>}
                
                <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
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
                                <button id="addCourse" type="submit" className="btn btn-primary" onClick={e => this.onAddItem()} data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default GroceryTable;