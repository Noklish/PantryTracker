import React, { Component } from 'react';
import { RecipeModal } from './modals/RecipeModal';
import { repository } from './../api/repository';

class Ingredients extends React.Component {
    repo = new repository();

    state = {
      tableList: []
    }

    render() {
        return (
            <>
            {
                this.state.tableList.map((n, j) => 
                    <tr key={j}>
                        <td>{n.foodName}</td>
                        <td>{n.quantity}</td>
                    </tr>
                )
            }
            </>
        )
    }

    componentDidMount(){
        debugger
        this.repo.getIngredients(this.props.recipeId).then(ingredients => {
              this.setState(state => ({
                  tableList: ingredients}));
        })
    } 
    
}

export default Ingredients;