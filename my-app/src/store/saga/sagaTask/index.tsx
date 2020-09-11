import { call, takeEvery, put } from "redux-saga/effects" ;
import { fetch_create_task, fetch_remove_task, fetch_toggle_task, fetchGetTask } from '../../../services/services_task';
import { CREATE_TASK, TOGGLE_TASK, REMOVE_TASK, INITIAL_TASK, GET_TASK } from "../../actions/types";


export function* watchCreateTask(){
    yield takeEvery(CREATE_TASK, workCreateTask);
}


export function* workCreateTask(action) {

    const idTodo = action.newTask.id_todo
    try{
        const data = yield call(fetch_create_task,action.newTask);
        if(data !== undefined){
            yield put({type : GET_TASK, idTodo });
        }
    } catch(error){
        console.log(error);
    }
}

export function* watchToggleTask(){
    yield takeEvery(TOGGLE_TASK, workToggleTask);
}

export function* workToggleTask(action){
        
   try{
        yield call(fetch_toggle_task,action.task);
    } catch(error){
        console.log(error);
    }
}

export function* watchRemoveTask(){
    yield takeEvery(REMOVE_TASK, workRemoveTask);
}

function* workRemoveTask(action){
    
    yield console.log(action.task);
        
    try{
        yield call(fetch_remove_task,action.task);
    } catch(error){
        console.log(error);
    }
}

export function* watchGetTask(){
    yield takeEvery(GET_TASK, workGetTask);
}

function* workGetTask(action){
    
    yield console.log(action.idTodo);
    try{
        const task = yield call(fetchGetTask,action.idTodo);
        yield put({type : INITIAL_TASK, task});
    } catch(error){
        console.log(error);
    }
}