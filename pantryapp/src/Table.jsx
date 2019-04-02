import React, { Component } from 'react';

export class Table extends React.Component {
    state = {
        hideMessage: false
    }
    render (){
        return (
            <>
            <div id="home">
                <h1>{this.props.title}</h1>
                <div id="foodAlert" className="alert alert-primary" role="alert">
                    You do not have any food items in your <b>{this.props.title}</b>. Click 'Add Item' to begin filling your <b>{this.props.title}</b>.
                </div>
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
                    <tbody id="foodTableBody">
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">
                    Add Item to your {this.props.title}
                </button>
            </div>
            </>
        );
    }
}

export default Table;