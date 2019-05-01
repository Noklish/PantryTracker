import React, { Component } from 'react';
import { FoodList } from '../../models/foodList';
import { repository } from '../../api/repository';

export class UpdateFoodModal extends React.Component {
    repo = new repository();
    constructor(props){
        super(props);
    }

    state = {
        food: '',
        name: '',
        brand: '',
        type: '',
        date: '',
        quantity: 1
    }

    onSubmit(){
        this.props.repo.editPantry(this.props.user.id, this.state.food, this.state.type, this.state.brand, this.state.quantity, this.state.date).then(() => this.setState({
            food: '',
            name: '',
            brand: '',
            type: '',
            date: '',
            quantity: ''
        })).catch(err => alert(err));
    }

    componentDidUpdate(prevProps){
        if(this.props.updateItem.foodID !== prevProps.updateItem.foodID){
            this.setState({
                food: this.props.updateItem.foodID,
                name: this.props.updateItem.foodName,
                brand: this.props.updateItem.brand,
                type: this.props.updateItem.foodGroup,
                date: this.props.updateItem.expirationDate,
                quantity: this.props.updateItem.quantity
            });
        }
    }

    render() {
        return (
            <>
            <div className="modal fade" id="update" tabIndex="-1" role="dialog" aria-labelledby="foodEntryLable" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="foodEntryLable">{`Update ${this.state.name}`}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form name="foodEntryForm" id="foodEntryForm">
                            <div className="form-group">
                                <label htmlFor="uBrand">Update brand</label>
                                <input  type="text"
                                        name="uBrand"                                             
                                        id="uBrand"
                                        className="form-control"
                                        placeholder="Please enter new brand name"
                                        value={this.state.brand}
                                        onChange={e => this.setState({ brand: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="uType">Update food group</label>
                                <select className= "form-control"
                                        name="uType"
                                        id="uType"
                                        value={this.state.type}
                                        onChange={e => this.setState({ type: e.target.value })} >
                                    <option value="N/A">Please select food type</option>
                                    <option value="grain">grain</option>
                                    <option value="fruit">fruit</option>
                                    <option value="begetable">vegetable</option>
                                    <option value="dairy">dairy</option>
                                    <option value="meat">meat</option>
                                    <option value="sauce">sauce</option>
                                    <option value="beverage">beverage</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="uDate">Update expiration date</label>
                                <input  type="date"
                                        name="uDate"                                             
                                        id="uDate"
                                        className="form-control"
                                        placeholder="Please enter new expiration date"
                                        value={this.state.date}
                                        onChange={e => this.setState({ date: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="uQuant">Update quantity</label>
                                <input  type="text"
                                        name="uQuant"                                             
                                        id="uQuant"
                                        className="form-control"
                                        placeholder="Please enter new quantity"
                                        value={this.state.quantity}
                                        onChange={e => this.setState({ quantity: e.target.value })} 
                                />
                            </div>
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="addCourse2" type="submit" className="btn btn-primary" data-dismiss="modal" onClick={e => this.onSubmit()}>Update</button>
                    </div>
                </div>
            </div>
        </div>
        
        </>
        );
    }
}

export default UpdateFoodModal;