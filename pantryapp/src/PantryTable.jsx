import React, { Component } from 'react';

export class PantryTable extends React.Component {
    render (){
        return (
            <>
            <div id="home">
                <h1>Your Pantry</h1>
                <div id="pantryAlert" class="alert alert-primary" role="alert">
                    You do not have any food items in your <b>Pantry</b>. Click 'Add Item' to begin filling your <b>Pantry</b>.
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Brand</th>
                            <th>Food Type</th>
                            <th>Expiration Date</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody id="pantryTableBody">
                    </tbody>
                </table>
                <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" onclick="events.setPantryList()" data-target="#exampleModal">
                    Add Item to your Pantry
                </button>
            </div>
            </>
        );
    }
}

export default PantryTable;