import { ADD_TODO, INITIAL_TODO, REMOVE_TODO } from "../../actions/types";
import { ITodoList } from "../../../interfaces/ITodoList";


const initialStateUser = {
    todos : []
};

export function todoList_reducer ( state = initialStateUser, action) {
    switch(action.type){
        
        case INITIAL_TODO:return {...state, todos : [...state.todos.concat(action.data)]};
        case ADD_TODO : return {...state, todos : state.todos.concat(action.data)};
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter((item : ITodoList)=> item.id !== action.sortTodo.id)};
        default : return state;
    }
}