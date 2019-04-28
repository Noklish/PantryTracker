import axios from 'axios';

export class repository {
    url = "ec2-18-208-170-68.com";
    
    //Account stuff
    getAccount(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    addAccount(userName, pass, email){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user`, userName, pass, email, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    changePassword(userId, newPass){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/passUpdate/${userId}`, newPass, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    //with JSon
    // addAccount(userName, pass, email){
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/user`, { userName: userName, pass: pass, email: email }, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
    //     });
    // }

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

    addGroceryItem(userId /* Idk what else we need in here */){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user/${userId}/groceryList`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    groceryToPantry(userId, foodName, foodGroup, brand, quantity){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/user/${userId}/groceryList/item`, {uID: userId, fName: foodName, fGroup: foodGroup, brand: brand, quanty: quantity}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    //favorite stuff
    addFavorite(userId, foodName){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/user/${userId}/pantry/favorite`, {uID: userId, fName: foodName}, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
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