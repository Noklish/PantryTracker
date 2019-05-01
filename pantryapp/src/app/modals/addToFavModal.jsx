import React, { Component } from 'react';
import { FoodList } from '../../models/foodList';


export class AddToFavModal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            minCount: ''
        }
    }

    onSubmit() {
        this.props.repo.addFavorite(this.props.user.id, this.props.id, this.state.minCount).catch(err => alert(err));
        this.setState({
            minCount: ''
      })
    }

    render() {
        return (
            <div className="modal fade" id="toFav" tabIndex="-1" role="dialog" aria-labelledby="toFavTable" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="toFavTable">Add this item to your favorites?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form name="addToFavForm" id="addToFavForm">
                            <div className="form-group">
                                <label htmlFor="minCount">Minimum amount</label>
                                <input  type="number"
                                        name="minCount"                                             
                                        id="minCount"
                                        className="form-control"
                                        placeholder="We'll alert you when you have below this number"
                                        value={this.state.minCount}
                                        onChange={e => this.setState({ minCount: e.target.value })} 
                                        required/>
                                <div className="invalid-feedback">Please enter minimum amount</div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="addCourse2" type="submit" className="btn btn-primary" data-dismiss="modal" onClick={e => this.onSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default AddToFavModal;
