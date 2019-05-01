import axios from 'axios';

export class repository {
    url = "http://ec2-18-208-170-68.compute-1.amazonaws.com:9000";

    config = {
        headers: {
            Authorization: '*'
        }
    }
    
    //Account stuff
    getAccount(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    addAccount(userName, pass, email){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user`, {userName: userName, pass: pass, email: email}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    changePassword(userId, newPass){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/passUpdate/${userId}`, {user: userId, newPass: newPass}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    login(userName, pass){
        debugger;
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    //pantry stuff
    getPantry(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/pantry`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }
    
    addPantryItem(userId, foodName, foodGroup, brand, quantity, date, description){
        return new Promise((resolve, reject) => {
            //debugger;
            axios.post(`${this.url}/user/${userId}/pantry/add`, {uID: userId, fName: foodName, exDate: date, desc: description, fGroup: foodGroup, br: brand, quant: quantity}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    deletePantryItem(userId, foodId){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/user/${userId}/pantry/${foodId}/deleteFood`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    sortByExpiration(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/pantry/exp`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    sortByCategories(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/pantry/categories`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    // addFoodItem()

    //Grocery stuff
    getGroceryList(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/groceryList`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    addGroceryItem(userId, foodName, foodGroup, brand, quantity){
        return new Promise((resolve, reject) => {
            //debugger;
            axios.post(`${this.url}/user/${userId}/groceryList`, {uID: userId, fName: foodName, fGroup: foodGroup, br: brand, quant: quantity}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    groceryToPantry(userId, foodId, expiration, quantity){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user/${userId}/grocery-to-pantry`, {uID: userId, fID: foodId, exDate: expiration, quant: quantity},this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    deleteGroceryItem(userId, foodId,){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/user/${userId}/groceryList/${foodId}/deleteRow`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    //favorite stuff
    getFavorites(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/favorites`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }
    
    addFavorite(userId, foodId, quant){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user/${userId}/pantry/favorite`, {uID: userId, fID: foodId, minVal: quant}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    favoritesToGrocery(userId, foodId, quantity){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user/${userId}/favorite-to-grocery`, {uID: userId, fID: foodId, quant: quantity},this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }



    //recipe stuff
    getRecipes(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/recipesSelect`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    getIngredients(recipeId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/recipes/${recipeId}/ingredients`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }
}

