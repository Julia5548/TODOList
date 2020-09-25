import { call, put } from "redux-saga/effects" ;
import { fetchCreateTodo, fetchGetTodo, fetchRemoveTodo } from "../../../services/servicesTodo";
import { addTodoAction, onInitalTodoAction } from "../../actions";


export function* workGetTodo(){
    try{
        const data = yield call(fetchGetTodo);
        //  console.log(data)
        yield put(onInitalTodoAction(data));
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workCreateTodo(action) {

    try{
        const data = yield call(fetchCreateTodo,action.sortTodo);
        if(data){
            yield put(addTodoAction(data));
        }
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workRemoveTodo(action){
        
    try{
        yield call(fetchRemoveTodo,action.sortTodo);
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}