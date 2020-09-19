import { INITIAL_TODO, REMOVE_TODO } from "../../actions/types";
import { ITodoList } from "../../../interfaces/ITodoList";


const initialStateUser = {
    todos : []
};

const initialTodo = (state, action) : Array<ITodoList> => {
    state.todos.filter((element: ITodoList) => {
        action.data = action.data.filter((newElement) => newElement.id !== element.id);
    });
    return action.data;
};

export function todoList_reducer ( state = initialStateUser, action) {
    switch(action.type){
        
        case INITIAL_TODO:
            const todo : any = initialTodo(state, action)
        return {...state, todos : [...state.todos.concat(todo)]} 
        
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter((item : ITodoList)=> item.id !== action.sortTodo.id)};
        default : return state;
    }
}