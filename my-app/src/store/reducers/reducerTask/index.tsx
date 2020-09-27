import { REMOVE_TASK, TOGGLE_TASK, INITIAL_TASK, ADD_TASK, INITIAL_USER } from "../../actions/types";
import  { ITask }  from "../../../interfaces/ITask";


const initialStateUser = {
    tasks :  []
};

export function task_reducer ( state = initialStateUser, action) {
    switch(action.type){
        case INITIAL_TASK:
            return {...state , tasks : [...state.tasks.concat(action.task)]};
        case ADD_TASK : return {...state, tasks: state.tasks.concat(action.task)}; 
        case TOGGLE_TASK:
            return { ...state, tasks: state.tasks.map((task : ITask)=>
                task.id === action.task.id ? {...task, is_completed : action.task.is_completed} : task )};
        case REMOVE_TASK:
            return {...state, tasks: state.tasks.filter((item : ITask)=> item.id !== action.task.id)};
        default : return state;
    };
}