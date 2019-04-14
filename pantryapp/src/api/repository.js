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

    updatePassword(userId, newPass){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/passUpdate/${userId}`, newPass, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    //food stuff
    getPantry(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/pantry`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    getFoodList(userId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/groceryList`, this.config).then(resp => resolve(resp.data)).catch(resp => alert(resp));
        });
    }

    addFoodItem()

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