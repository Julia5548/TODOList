import { call, put } from "redux-saga/effects" ;
import { fetchCreateTask, fetchRemoveTask, fetchToggleTask, fetchGetTask } from '../../../services/services_task';
import { INITIAL_TASK, ADD_TASK } from "../../actions/types";


export function* workCreateTask(action) {

    const idTodo = action.newTask.id_todo
    try{
        const data = yield call(fetchCreateTask,action.newTask);
        if(data !== undefined){
            yield put({type : ADD_TASK, data });
        }
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workToggleTask(action){
        
   try{
        yield call(fetchToggleTask,action.task);
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workRemoveTask(action){
    
    yield console.log(action.task);
        
    try{
        yield call(fetchRemoveTask,action.task);
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workGetTask(action){
    
    try{
        const task = yield call(fetchGetTask,action.idTodo);
        yield put({type : INITIAL_TASK, task});
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}