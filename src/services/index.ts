import { getFoods, addFood, updateFood, deleteFood } from './foodRequests';
import { getGuests, addGuest, updateGuest, deleteGuest } from "./guestRequests";
import { getTables, addTable, deleteTable } from "./tableRequests";
import { getTodos, addTodo, updateTodo, updateTodosStatus, deleteTodo } from "./todosRequests";
import { getWedding } from "./weddings/weddingsRequests";
import { getOperations, addOperation, updateOperation, deleteOperation } from "./operationsRequests";
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
    deleteGuest,
    addTable, 
    deleteTable,
    addTodo,
    updateTodo,
    updateTodosStatus,
    deleteTodo,
    addOperation,
    updateOperation,
    deleteOperation
};