import { PantryTable } from './app/PantryTable';
import GroceryTable from './app/GroceryTable';
import FavoritesTable from './app/FavoritesTable';
import RecipeTable from './app/RecipeTable';
import UpdateProfile from './app/UpdateProfile';
import Home from './app/Home';
import Login from './app/Login';
import App from './app/App';

export const ROUTES = [
    { path: '/user/:userId/pantry', component: PantryTable, authRequired: true},
    { path: '/user/:userId/grocery-list', component: GroceryTable, authRequired: true},
    { path: '/user/:userId/favorites', component: FavoritesTable, authRequired: true},
    { path: '/user/:userId/recipes', component: RecipeTable, authRequired: true},
    { path: '/user/:userId/update-profile', component: UpdateProfile, authRequired: true},
    { path: '/user/:userId/home', component: Home, authRequired: true},
    { path: 'login', component: Login, authRequired: false},
    { path: '/home', component: Home, authRequired: false}
];

export default ROUTES;