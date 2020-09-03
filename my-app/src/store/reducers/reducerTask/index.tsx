import { CREATE_TASK, REMOVE_TASK, TOGGLE_TASK } from "../../actions/types";
import  { ITask }  from "../../../interfaces/ITask";


const initialStateUser = {
    tasks : []
};

export function user_reducer ( state = initialStateUser, action)  {
    switch(action.type){
        case CREATE_TASK:
            return Object.assign({} , state, {
                tasks : [
                    ...state.tasks,
                    {
                        title: action.newTask.title,
                        isCompleted : action.newTask.isCompleted
                    }
                ]
            });
        case TOGGLE_TASK:
            return Object.assign({}, state, {
                tasks: state.tasks.map((task, index) => {
                    if(index === action.task.id){
                        return Object.assign({}, task, {
                            isCompleted : action.task.isCompleted
                        });
                    }
                    return task;
                })
            });
        case REMOVE_TASK:
            return Object.assign({}, state, {
                tasks: state.tasks.filter((item : ITask)=> item.id !== action.task.id)
            });
        default : return state;
    }
}