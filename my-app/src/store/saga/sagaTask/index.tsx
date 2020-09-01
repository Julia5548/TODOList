import { call, takeEvery } from "redux-saga/effects" ;
import { fetch_create_task, fetch_remove_task, fetch_toggle_task } from '../../../services/services_task';
import { CREATE_TASK, TOGGLE_TASK, REMOVE_TASK } from "../../actions/types";


export function* watch_create_task(){
    yield takeEvery(CREATE_TASK, work_create_task);
}


export function* work_create_task(action) {

   yield console.log(action.newTask)

    try{
        yield call(() => fetch_create_task(action.newTask));
    } catch(error){
        console.log(error)
    }
}

export function* watch_toggle_task(){
    yield takeEvery(TOGGLE_TASK, workToggleTask);
}

export function* workToggleTask(action){
        
   yield console.log(action.task);

   try{
        yield call(() => fetch_toggle_task(action.task));
    } catch(error){
        console.log(error)
    }
}

export function* watch_remove_task(){
    yield takeEvery(REMOVE_TASK, workRemoveTask);
}

function* workRemoveTask(action){
    
    yield console.log(action.task);
        
    try{
        yield call(() => fetch_remove_task(action.task));
    } catch(error){
        console.log(error)
    }
}