import PantryTable from './app/PantryTable';
import GroceryTable from './app/GroceryTable';
import FavoritesTable from './app/FavoritesTable';
import RecipeTable from './app/RecipeTable';
import UpdateProfile from './app/UpdateProfile';
import Home from './app/Home';
import { Login } from './app/Login';

export const ROUTES = [
    { path: '/login', component: Login},
    { path: '/pantry', component: PantryTable},
    { path: '/grocery-list', component: GroceryTable},
    { path: '/favorites', component: FavoritesTable},
    { path: '/recipes', component: RecipeTable},
    { path: '/update-profile', component: UpdateProfile},
    { path: '/home', component: Home},
    // { path: '/', component: Home}
];

export default ROUTES;