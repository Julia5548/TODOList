import { call, put } from "redux-saga/effects" ;
import { fetchCreateTodo, fetchGetTodo, fetchRemoveTodo } from "../../../services/servicesTodo";
import { INITIAL_TODO } from "../../actions/types";


export function* workGetTodo(){

    try{
        const data = yield call(fetchGetTodo);
        // console.log(data)
        yield put({type : INITIAL_TODO, data})
    } catch(error){
        console.log('ERROR_SAGA ', error);
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