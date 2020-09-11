import { call, takeEvery, put, delay } from "redux-saga/effects" ;
import { fetch_create_user, fetch_login_user, fetch_reset_password } from "../../../services/services_user";
import { LOGIN_USER, CURRENT_USER, CREATE_USER, RESET_PASSWORD, HIDE_ERROR, SHOW_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";


export function* watch_login_user(){
    yield takeEvery(LOGIN_USER, worker_login_user);
}

function* worker_login_user(action) {
    
    const user : IUser = action.user;
    const { history } = action;
    const login_user = {
        username : user.username,
        password : user.password!
    };
    try{
        const data  = yield call(fetch_login_user,login_user);
        localStorage.setItem('token', data.token);
        
        const current_user = data.user;
        yield put({type : CURRENT_USER, current_user});
        
        const url : string = '/todo/' + current_user.id;
        history.push(url);

    }catch(error){
        console.log('ERROR_SAGA: ', error);
        yield put({type : SHOW_ERROR});
        yield delay(2000)
        yield put({type : HIDE_ERROR});
    }
}


export function* watch_create_user(){
    yield takeEvery(CREATE_USER, worker_create_user);
}

function* worker_create_user(action){
    
    const { history } = action;
    
    try{
        const data = yield call(fetch_create_user,action.user);
        if (data.response === "error"){
            yield put({type : SHOW_ERROR})
            yield delay(2000)
            yield put({type : HIDE_ERROR});
        }else{
            history.push('/');
        }
    }catch(error){
        console.log('ERROR_SAGA_SIGN_UP ', error )
    }
}

export function* watch_reset_password(){
    yield takeEvery(RESET_PASSWORD, worker_reset_password);
}

function* worker_reset_password(action){
    const email : string = action.email;
    const { history }  = action;

    yield call(fetch_reset_password, email, history);
}