import React, { Component } from 'react';
import {FoodList} from './../../models/foodList'

class FavoriteModal extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        food: '',
        brand: '',
        type: '',
        expire: '',
        quantity: 1
    }

    onAddItem() {
        this.props.onNewFavoritesItem(new FoodList(this.state.food, this.state.brand, this.state.type, this.state.expire, this.state.quantity))
        this.setState({
            food: '',
            brand: '',
            type: '',
            expire: '',
            quantity: 1
      })
    }

    render() {
        return (
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
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="addCourse" type="submit" className="btn btn-primary" onClick={e => this.onAddItem()} data-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default FavoriteModal;