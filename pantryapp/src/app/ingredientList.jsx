import React from 'react';
import { Ingredient } from '../models/ingredient'

class IngredientList extends React.Component {

    state = {
        name: '',
        quantity: 0
    }

    onAddIngredient() {
        this.props.onNewIngredient(new Ingredient(this.state.name, this.state.quantity));
        this.setState({
            name: '',
            quantity: 0
        });
    }

    render() {
        return(
            <div>
                {
                    this.props.ingredientList.map((a, i) =>
                    <ul>
                        <li>{ a.name }: { a.quantity } </li>
                    </ul>
                    )
                }
                    <div className="form-group">
                        <label htmlFor="name">Ingredient</label>
                        <input  type="text" 
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Please Enter Next Ingredient"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="quantity">Quantity</label>
                        <input  type="text" 
                                name="quantity"
                                id="quantity"
                                className="form-control"
                                placeholder="Please Enter Ingredient Quantity"
                                value={this.state.quantity}
                                onChange={e => this.setState({ quantity: e.target.value })} />
                    </div> 
                    <button id="addIngredient" type="button" className="btn btn-primary" onClick={e => this.onAddIngredient()}>Add Ingredient</button>
            </div>
        )
    }
}


export default IngredientList;
