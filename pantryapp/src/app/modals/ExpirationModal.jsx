import React, { Component } from 'react';
import {FoodList} from '../../models/foodList';
import { repository }  from './../../api/repository';

class ExpirationModal extends React.Component {

    repo = new repository();
    constructor(props){
        super(props);
    }

    state = {
        expire: '',
    }

    onAddItem() {
        this.props.addExpiration(this.state.expire);
        this.setState({
            expire: ''
      });
    }

    render() {
        return (
            <div className="modal fade" id="expiration" tabIndex="-1" role="dialog" aria-labelledby="foodEntryLable" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="foodEntryLable">Add Expiration Date</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={e => this.onAddItem()}>
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
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.onAddItem()}>Close</button>
                        <button id="addCourse" type="submit" className="btn btn-primary" onClick={e => this.onAddItem()} data-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ExpirationModal;