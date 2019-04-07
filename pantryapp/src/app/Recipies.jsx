import React, { Component } from 'react';
import { Recipe } from './../models/recipe';
import { Ingredient } from '../models/ingredient';

export class Recipies extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      show: false,
      recipes: [
        new Recipe(
          "Cacio e Pepe",
          "Dinner",
          "Cook spaghetti until al dente. In a pan, melt butter and parmesan into thick sauce. Add pasta to sauce and add pepper. Serve.",
          [new Ingredient("Spaghetti", "1 lb"), new Ingredient("Pepper", "1 tbs"), new Ingredient("Parmesan", "1/2 cup"), new Ingredient("Butter", "1 stick")]
        ),
        new Recipe(
          "Carbonara",
          "Dinner",
          "Cook spaghetti until al dente. In a pan, cook guanciale, pancetta, or bacon until fat renders. In a bowl, whisk together one whole egg, 3 egg yolks, parmesan, and pepper. Add some pasta water to the mixture to temper the eggs. Add the pasta to the pan with the pork fat, remove from the heat, and add egg mixture. Serve with parmesan.",
          [new Ingredient("Spaghetti", "1lb"), new Ingredient("Bacon", "1/2 lb"), new Ingredient("Egg", 4), new Ingredient("Parmesan", "1/2 cup"), new Ingredient("Pepper", "1 tbs")]
        ),
        new Recipe(
          "Bear Grylls Secret Sauce",
          "Breakfast, Lunch, and Dinner, baby",
          "Piss in a goddamn bucket. Bring to a rolling boil. Drink it up, asshole.",
          [new Ingredient("Piss", "All"), new Ingredient("Bucket", 1)]
        )
      ]
    }
  }


    render() {
        return (
          <>
            <h1>{this.props.title}</h1>
            <div className="accordion" id="recipeAccordion">
            {
                this.state.recipes.map((r,i) => 
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
          </>
        );
      }
}

export default Recipies;