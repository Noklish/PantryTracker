import React, { Component } from 'react';
import { FoodList } from './../models/foodList';
import FoodItemModal from './modals/FoodItemModal';
import { repository } from './../api/repository';

export class Table extends React.Component {
    repo = new repository();

    onCheckModal(){

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
                <h1 className="text-white">{this.props.title}</h1>
                {!this.props.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any food items in your <b>{this.props.title}</b>. Click 'Add Item' to begin filling your <b>{this.props.title}</b>.
                </div>}
                {!!this.props.tableList.length && <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <th><button type="button" class="btn btn-link">Food Item <i className="fa fa-sort"></i></button></th>
                            <th>Brand <i className="fa fa-sort"></i></th>
                            <th>Food Type <i className="fa fa-sort"></i></th>
                            <th>Expiration Date <i className="fa fa-sort"></i></th>
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
                </table>}
                
                <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your {this.props.title}
                </button>
                {
                    <FoodItemModal onNewItem={f => this.props.onNewItem(f)} page={this.props.title} repo={ this.repo } />
                }
            </div>
            </>
        );
    }
}

export default Table;