import PantryTable from './app/PantryTable';
import GroceryTable from './app/GroceryTable';
import FavoritesTable from './app/FavoritesTable';
import RecipeTable from './app/RecipeTable';
import UpdateProfile from './app/UpdateProfile';
import Home from './app/Home';
import { Login } from './app/Login';

export const ROUTES = [
    { path: '/login', component: Login},
    { path: '/user/:userId/pantry', component: PantryTable},
    { path: '/user/:userId/grocery-list', component: GroceryTable},
    { path: '/user/:userId/favorites', component: FavoritesTable},
    { path: '/user/:userId/recipes', component: RecipeTable},
    { path: '/user/:userId/update-profile', component: UpdateProfile},
    { path: '/user/:userId/home', component: Home},
    // { path: '/', component: Home}
];

export default ROUTES;