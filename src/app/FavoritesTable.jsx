import React, { Component } from 'react';
import {FoodList} from './../models/foodList'
import FavoriteModal from './modals/FavoriteModal';
import { repository } from './../api/repository';

class FavoritesTable extends React.Component {
    repo = new repository();

    render() {
        return (
            <div id="home">
                <h1 className="text-white">Favorites</h1>
                {!this.props.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any <b>Favorites</b>. Click 'Add Item' to begin filling your <b>Recipies List</b>.
                </div>}
            {!!this.props.tableList.length && <table className="table table-light table-striped">
            <thead>
                <tr>
                    <th><button type="button" class="btn btn-link">Food Item <i className="fa fa-sort"></i></button></th>
                    <th>Brand <i className="fa fa-sort"></i></th>
                    <th>Food Type <i className="fa fa-sort"></i></th>
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
                            <td><button type="button" className="btn btn-secondary float-right" >{this.props.quick}</button></td>
                         </tr>
                    )
                }
            </tbody>
        </table>}
        <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                    Add Item to your Favorites
        </button>
        {
            <FavoriteModal onNewFavoritesItem={f => this.props.onNewFavoritesItem(f) } repo={ this.repo } />
        }
        </div>
        );
    }
}

export default FavoritesTable;