import { call, put } from "redux-saga/effects" ;
import { createTodo, getTodos, removeTodo } from "../../../services";
import { fetchCreateTodo, fetchGetTodo, fetchRemoveTodo } from "../../../services/servicesTodo";
import { addTodoAction, onInitalTodoAction } from "../../actions";


export function* workGetTodo(){
    try{
        const result = yield call(getTodos);
        // console.log(result.response.data)
        yield put(onInitalTodoAction(result.response.data));
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workCreateTodo(action) {

    try{
        const result = yield call(createTodo,action.sortTodo);
        // const data = yield call(fetchCreateTodo,action.sortTodo);
        if(result.response.data){
            yield put(addTodoAction(result.response.data));
        }
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workRemoveTodo(action){
        
    try{
        // yield call(fetchRemoveTodo,action.sortTodo);
        const data = yield call(removeTodo,action.sortTodo.id);
        console.log(data)
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}