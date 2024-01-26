import { getFoods, addFood, updateFood, deleteFood } from './foodRequests';
import { getGuests, addGuest, updateGuest, deleteGuest } from "./guests/guestRequests";
import { getTables } from "./tables/tableRequests";
import { getTodos } from "./todos/todosRequests";
import { getWedding } from "./weddings/weddingsRequests";
import { getOperations } from "./budget/operationsRequests";
import { login } from "./authRequests";

export { 
    getGuests, 
    getTables, 
    getTodos, 
    getWedding, 
    getOperations, 
    login, 
    getFoods,
    addFood, 
    updateFood, 
    deleteFood,
    addGuest,
    updateGuest,
    deleteGuest
};