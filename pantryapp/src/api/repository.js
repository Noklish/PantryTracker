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
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, {User: userName, Pass: pass}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    //pantry stuff
    getPantry(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/pantry`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
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
            axios.post(`${this.url}/user/${userId}/groceryList`, {uID: userId, fName: foodName, fGroup: foodGroup, b: brand, quant: quantity}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    groceryToPantry(userId, foodName, foodGroup, brand, quantity){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/user/${userId}/groceryList/item`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    //favorite stuff
    addFavorite(userId, foodId){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user/${userId}/pantry/favorite`, {uID: userId, fID: foodId}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }



    //recipe stuff
    getRecipes(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/recipes`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    getRecipe(userId, recipeName){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/recipes/${recipeName}`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    getIngredients(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/recipes/ingredient`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }
}