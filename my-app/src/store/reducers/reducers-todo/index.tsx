import { CREATE_TODO, REMOVE_TODO } from "../../actions/types";
import { ITodoList } from "../../../interfaces/ITodoList";


const initialStateUser = {
    todos : []
};

export function todoList_reducer ( state = initialStateUser, action)  {
    switch(action.type){
        case CREATE_TODO:
            return Object.assign({} , state, {
                todos : [
                    ...state.todos,
                    {
                        user : action.sortTodo.user,
                        title: action.sortTodo.title
                    }
                ]
            });
        case REMOVE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.filter((item : ITodoList)=> item.id !== action.sortTodo.id)
            });
        default : return state;
    }
}