import { REMOVE_TASK, TOGGLE_TASK, INITIAL_TASK } from "../../actions/types";
import  { ITask }  from "../../../interfaces/ITask";


const initialStateUser = {
    tasks :  []
};

const initialTask = (state, action) : ITask[] => {
    state.tasks.filter((element : ITask)  => {
        action.task=action.task.filter((newElement) => newElement.id !== element.id)
    });
    return action.task;
};

export function task_reducer ( state = initialStateUser, action) {
    switch(action.type){
        case INITIAL_TASK:
            const task : any = initialTask(state, action);
            return {...state , tasks : [...state.tasks.concat(task)]} 
        case TOGGLE_TASK:
            return { ...state, tasks: state.tasks.map((task : ITask)=>
                task.id === action.task.id ? {...task, is_completed : action.task.is_completed} : task )};
        case REMOVE_TASK:
            return {...state, tasks: state.tasks.filter((item : ITask)=> item.id !== action.task.id)};
        default : return state;
    };
}