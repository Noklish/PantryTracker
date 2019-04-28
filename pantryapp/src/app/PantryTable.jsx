import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import { repository }  from './../api/repository';
import FoodItemModal from './modals/FoodItemModal';

export class PantryTable extends React.Component {
    repo = new repository();

    state = {
        food: '',
        brand: '',
        type: '',
        date: '',
        quantity: 1,
        tableList: []
    }


    onCheckModal(){

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

        this.setState(state => ({
            food: '',
            brand: '',
            type: '',
            date: '',
            quantity: 1
          }));
    }

    checkExpiration(date) {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        if(date == 'N/A'){
            return <td>{date}</td>;
        }

        var splitDate = date.split("-");


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

    render (){
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
                            <th><button type="button" class="btn btn-link">Food Item <i className="fa fa-sort"></i></button></th>
                            <th>Brand <i className="fa fa-sort"></i></th>
                            <th>Food Type <i className="fa fa-sort"></i></th>
                            <th>Expiration Date <i className="fa fa-sort"></i></th>
                            <th>Quantity</th>
                            <th className="text-right">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableList.map((a, i) => 
                                <tr key={i}>
                                    <td>{a.foodName}</td>
                                    <td>{a.brand}</td>
                                    <td>{a.foodGroup}</td>
                                    <td>{a.expirationDate}</td>
                                    <td>{a.quantity}</td>
                                    <td><button type="button" className="btn btn-danger float-right">Delete</button></td>
                                 </tr>
                            )
                        }
                    </tbody>
                </table>}
                
                <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your Pantry
                </button>
                {
                    <FoodItemModal repo={ this.repo } />
                }
            </div>
            </>
        );
    }

    componentDidMount(){
        let userId = +this.props.match.params.userId;
        if(userId){
            this.repo.getPantry(userId).then(pantry => {
                this.setState(state => ({
                    tableList: pantry}));
            })
        }
    }
}

export default PantryTable;