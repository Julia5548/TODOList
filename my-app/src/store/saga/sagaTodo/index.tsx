import { call } from "redux-saga/effects" ;
import { fetchCreateTodo, fetchGetTodo, fetchRemoveTodo } from "../../../services/servicesTodo";


export function* workGetTodo(){

    try{
        const data = yield call(fetchGetTodo);
        return data;
    } catch(error){
        console.log(error);
    }
}
export function* workCreateTodo(action) {

   yield console.log('CREATE-TODO ',action.sortTodo);

    try{
        yield call(fetchCreateTodo,action.sortTodo);
    } catch(error){
        console.log(error);
    }
}

export function* workRemoveTodo(action){
    
    yield console.log('REMOVE_TODO ',action.sortTodo);
        
    try{
        yield call(fetchRemoveTodo,action.sortTodo);
    } catch(error){
        console.log(error);
    }
}