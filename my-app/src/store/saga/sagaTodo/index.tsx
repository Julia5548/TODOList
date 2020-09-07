import { call, takeEvery } from "redux-saga/effects" ;
import { CREATE_TODO, REMOVE_TODO } from "../../actions/types";
import { fetchCreateTodo, fetchRemoveTodo } from "../../../services/servicesTodo";


export function* watchCreateTodo(){
    yield takeEvery(CREATE_TODO, workCreateTodo);
}

export function* workCreateTodo(action) {

   yield console.log('CREATE-Todo ',action.sortTodo);

    try{
        yield call(() => (fetchCreateTodo(action.sortTodo)));
    } catch(error){
        console.log(error);
    }
}

export function* watchRemoveTodo(){
    yield takeEvery(REMOVE_TODO, workRemoveTodo);
}

function* workRemoveTodo(action){
    
    yield console.log('REMOVE_TODO ',action.sortTodo);
        
    try{
        yield call(() => fetchRemoveTodo(action.sortTodo));
    } catch(error){
        console.log(error);
    }
}