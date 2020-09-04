import { call, takeEvery } from "redux-saga/effects" ;
import { CREATE_TODO, REMOVE_TODO } from "../../actions/types";


export function* watchCreateTodo(){
    yield takeEvery(CREATE_TODO, workCreateTodo);
}


export function* workCreateTodo(action) {

   yield console.log(action.sortTodo);

    try{
        // yield call(() => fetch_create_task(action.newTask));
    } catch(error){
        console.log(error);
    }
}

export function* watchRemoveTodo(){
    yield takeEvery(REMOVE_TODO, workRemoveTodo);
}

function* workRemoveTodo(action){
    
    yield console.log(action.sortTodo);
        
    try{
        // yield call(() => fetch_remove_task(action.task));
    } catch(error){
        console.log(error);
    }
}