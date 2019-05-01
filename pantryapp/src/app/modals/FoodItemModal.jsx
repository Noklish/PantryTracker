import React, { Component } from 'react';
import { FoodList } from '../../models/foodList';

class FoodItemModal extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        food: '',
        brand: '',
        type: '',
        date: '',
        quantity: 1
    }

    onAddItem() {
        this.props.onAddItemBase(this.state);
        this.setState({
            food: '',
            brand: '',
            type: '',
            date: '',
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
                                    <option value="grain">grain</option>
                                    <option value="fruit">fruit</option>
                                    <option value="vegetable">vegetable</option>
                                    <option value="dairy">dairy</option>
                                    <option value="meat">meat</option>
                                    <option value="sauce">sauce</option>
                                    <option value="beverage">beverage</option>
                                    <option value="other">other</option>
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
                        <button id="addCourse2" type="submit" className="btn btn-primary" data-dismiss="modal" onClick={e => this.onAddItem()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default FoodItemModal;