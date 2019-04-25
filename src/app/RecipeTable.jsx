import React, { Component } from 'react';
import { RecipeModal } from './modals/RecipeModal';
import { repository } from './../api/repository';

class RecipeTable extends React.Component {
    repo = new repository();

    render() {

        return (
            <>
            <h1 className="text-white">Recipies</h1>
            {!this.props.recipies.length && <div className="alert alert-light" role="alert">
                    You do not have any <b>Recipies</b>. Click 'Add Item' to begin filling your <b>Recipies List</b>.
                </div>}
            <div className="accordion" id="recipeAccordion">
            {
                this.props.recipies.map((r,i) => 
                  <div className="card" key={i}>
                    <div className="card-header">
                      <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#accordion-" + i} aria-expanded="true" aria-controls={"accordion-" + i}>{r.name}</button>
                      <span className="float-right">{r.meal}</span>
                    </div>
                    <div id={"accordion-" + i} className="collapse" aria-labelledby={"heading-" + i} data-parent="#recipeAccordion">
                      <div className="card-body">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Ingredient</th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              r.ingredients.map((n, j) => 
                                <tr key={j}>
                                  <td>{n.name}</td>
                                  <td>{n.quantity}</td>
                                </tr>
                                )
                            }
                          </tbody>
                        </table>
                        <p>{r.description}</p>
                      </div>
                    </div>
                  </div>
                )
            }
            </div>

            <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                Add Item to your Recipe List
            </button>
            <RecipeModal onNewRecipe={r => this.props.onNewRecipe(r) } repo={ this.repo }/>
            </>
        )
    }
    
}

export default RecipeTable;