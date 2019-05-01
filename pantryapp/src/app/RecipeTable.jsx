import React, { Component } from 'react';
import { RecipeModal } from './modals/RecipeModal';
import { repository } from './../api/repository';
import Ingredients from './Ingredients';

class RecipeTable extends React.Component {
    repo = new repository();

    state = {
      tableList: [],
      id: ''
    }

    render() {
        return (
            <>
            <h1 className="text-white">Recipes</h1>
            {!this.state.tableList.length && <div className="alert alert-light" role="alert">
                    You do not have any <b>Recipies</b>. Click 'Add Item' to begin filling your <b>Recipies List</b>.
                </div>}
            <div className="accordion" id="recipeAccordion">
            {
                this.state.tableList.map((r,i) => 
                  <div className="card" key={i}>
                    <div className="card-header">
                      <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#accordion-" + i} aria-expanded="true" aria-controls={"accordion-" + i}>{r.recipeName}</button>
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
                              <Ingredients recipeId={r.recipeID}/>
                          </tbody>
                        </table>
                        <p>{r.steps}</p>
                      </div>
                    </div>
                  </div>
                )
            }
            </div>

            <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#foodEntry">
                Add Item to your Recipe List
            </button>
            <RecipeModal userId={ this.state.id }/>
            </>
        )
    }

    componentDidMount(){
      let userId = +this.props.match.params.userId;
      if(userId){
          this.repo.getRecipes(userId).then(recipes => {
              this.setState(state => ({
                  tableList: recipes,
                  id: userId}));
          })
      }
  }
    
}

export default RecipeTable;
