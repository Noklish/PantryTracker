import React, { Component } from 'react';
import {FoodList} from '../../models/foodList';
import { repository }  from './../../api/repository';

class ExpirationModal extends React.Component {

    repo = new repository();
    constructor(props){
        super(props);
    }

    state = {
        food: '',
        name: '',
        brand: '',
        type: '',
        quantity: '',
        expire: '',
    }

    onAddItem() {
        this.props.removeFromTable(this.state.food)
        this.props.repo.groceryToPantry(this.props.user, this.state.food, this.state.expiration, this.state.quantity).then(() => {
            this.setState(state => ({
                food: '',
                name: '',
                brand: '',
                type: '',
                quantity: '',
                expire: ''
            }))
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.quickAddItem.foodID !== prevProps.quickAddItem.foodID){
            this.setState({
                food: this.props.quickAddItem.foodID,
                name: this.props.quickAddItem.foodName,
                brand: this.props.quickAddItem.brand,
                type: this.props.quickAddItem.foodGroup,
                quantity: this.props.quickAddItem.quantity,
                expire: ''
            })
        }
    }

    render() {
        return (
            <div className="modal fade" id="expiration" tabIndex="-1" role="dialog" aria-labelledby="foodEntryLable" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="foodEntryLable">Add Expiration Date</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form name="foodEntryForm" id="foodEntryForm">
                        
                            <div className="form-group">
                                <label htmlFor="expirationDate">Expiration Date</label>
                                <input  type="date" 
                                        name="expirationDate"
                                        id="expirationDate"
                                        className="form-control"
                                        placeholder="Please Enter Expiration Date"
                                        value={this.state.date}
                                        onChange={e => this.setState({ expire: e.target.value })} />
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

export default ExpirationModal;