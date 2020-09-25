import { call, put } from "redux-saga/effects" ;
import { fetchCreateTask, fetchRemoveTask, fetchToggleTask, fetchGetTask } from '../../../services/services_task';
import {  addTaskAction, onInitalTaskAction } from "../../actions";


export function* workCreateTask(action) {
 
    try{
        const data = yield call(fetchCreateTask,action.newTask);
        if(data){
            yield put(addTaskAction(data));
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
  
    try{
        yield call(fetchRemoveTask,action.task);
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workGetTask(action){
    try{
        const task = yield call(fetchGetTask,action.idTodo);
        yield put(onInitalTaskAction(task));
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}