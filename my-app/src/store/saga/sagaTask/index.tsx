import { call, put } from "redux-saga/effects" ;
import { createTask, getTasks, removeTask, toggleTask } from "../../../services";
import { fetchCreateTask, fetchRemoveTask, fetchToggleTask, fetchGetTask } from '../../../services/services_task';
import {  addTaskAction, onInitalTaskAction } from "../../actions";


export function* workCreateTask(action) {

    try{
        const result = yield call(createTask,action.newTask);
        // const data = yield call(fetchCreateTask,action.newTask);
        if(result.response.data){
            yield put(addTaskAction(result.response.data));
        }
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workToggleTask(action){

    try{
        yield call(toggleTask,action.task);
        // yield call(fetchToggleTask,action.task);
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workRemoveTask(action){
  
    try{
        yield call(removeTask,action.task.id);
        // yield call(fetchRemoveTask,action.task);
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workGetTask(action){
    try{
        const task = yield call(getTasks,action.idTodo);
        // const task = yield call(fetchGetTask,action.idTodo);
        yield put(onInitalTaskAction(task.response.data));
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}