import React, { Component } from 'react';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import IngredientList from './ingredientList';

class RecipeTable extends React.Component {

    state = {
        name: '',
        meal: '',
        description: '',
        ingredients: []
    }

    onNewIngredient(ingredient) {
      this.setState(state => {
          state.ingredients.push(ingredient);
          return state;
      })
    }

    onAddItem() {
        this.props.onNewRecipe(new Recipe(this.state.name, this.state.meal, this.state.description, this.state.ingredients))
        this.setState({
          name: '',
          meal: '',
          description: '',
          ingredients: []
      })
    }

    render() {

        return (
            <>
            <h1>Recipies</h1>
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

            <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                Add Item to your Recipe List
            </button>
            <div className="modal fade" id="foodEntry" tabIndex="-1" role="dialog" aria-labelledby="foodEntryLable" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="foodEntryLable">Add Food Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <form name="foodEntryForm" id="foodEntryForm">
                                    
                                    <div className="form-group">
                                        <label htmlFor="Name">Name</label>
                                        <input  type="text"
                                                name="Name" 
                                                id="Name"
                                                className="form-control"
                                                placeholder="Please Enter Name of Recipe"
                                                value={this.state.name}
                                                onChange={e => this.setState({ name: e.target.value })} 
                                                required/>
                                        <div className="invalid-feedback">Please enter recipe name</div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="meal">Meal</label>
                                        <select className="form-control"
                                                name="meal"
                                                id="meal"
                                                value={this.state.meal}
                                                onChange={e => this.setState({ meal: e.target.value })}>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <IngredientList onNewIngredient={i => this.onNewIngredient(i)} ingredientList={this.state.ingredients} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <input  type="text"
                                                name="description" 
                                                id="description" 
                                                className="form-control"
                                                placeholder="Please enter How to Make Recipe"
                                                value={this.state.description}
                                                onChange={e => this.setState({ description: e.target.value })} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button id="addRecipe" type="button" className="btn btn-primary" onClick={e => this.onAddItem()} data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default RecipeTable;
