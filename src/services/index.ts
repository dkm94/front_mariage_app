import { getFoods, addFood, updateFood, deleteFood } from './foodRequests';
import { getGuests, addGuest, updateGuest, deleteGuest, updateGuestMedia } from "./guestRequests";
import { getTables, addTable, deleteTable, updateTableWithGuests, updateTablesName } from "./tableRequests";
import { getTodos, addTodo, updateTodo, updateTodosStatus, deleteTodo } from "./todosRequests";
import { getWedding, updateWedding } from "./weddingsRequests";
import { getOperations, addOperation, updateOperation, deleteOperation } from "./operationsRequests";
import { login, getUser, deleteAccount, updatePassword } from "./authRequests";

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
    updateTableWithGuests,
    updateTablesName,
    addTodo,
    updateTodo,
    updateTodosStatus,
    deleteTodo,
    addOperation,
    updateOperation,
    deleteOperation,
    updateGuestMedia,
    getUser,
    deleteAccount,
    updatePassword,
    updateWedding
};