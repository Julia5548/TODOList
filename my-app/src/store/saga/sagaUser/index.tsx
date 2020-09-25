import { call, delay, put, race, take } from "redux-saga/effects" ;
import { fetchSendEmail, fetchCreateUser, fetchLoginUser, fetchResetPassword, fetchGetDataUser } from "../../../services/services_user";
import { HIDE_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";
import { push } from 'connected-react-router';
import { hideErrorAction, onCurrentUserAction, onLogoutAction, showErrorAction } from "../../actions";


function* show_error(){

    yield put(showErrorAction());
    const { hideTimeout } = yield race({
        hide: take(HIDE_ERROR),
        hideTimeout: delay(3e3),
    });

    if (hideTimeout) {
        yield put(hideErrorAction());
    }
}

export function* workGetUser(){
    try{
        const current_user = yield call(fetchGetDataUser);
        if(current_user && current_user.id !== undefined){
            yield put(onCurrentUserAction(current_user))
            yield put(push('/todo'));
        }else{
            localStorage.removeItem('token');
            yield put(onLogoutAction());
        }
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workerLoginUser(action) {
    
    const user : IUser = action.user;
    const login_user = {
        username : user.username,
        password : user.password!
    };
    try{

        const data  = yield call(fetchLoginUser,login_user);
        localStorage.setItem('token', data.token);
        
        const current_user = data.user;
        yield put(onCurrentUserAction(current_user));
        yield put(push('/todo'));

    }catch(error){
        console.log('ERROR_SAGA: ', error);
        yield call(show_error);
    }
}

export function* workerCreateUser(action){

    try{
        const data = yield call(fetchCreateUser,action.user);
        if (data){
            yield call(show_error);
        }else{
            yield put(push('/'));
        }
    }catch(error){
        console.log('ERROR_SAGA_SIGN_UP ', error );
    }
}

export function* workerResetPassword(action){
    const password : string = action.password;
    const token = action.token;
    try {
        const data = yield call(fetchResetPassword, password, token);
        if(data){
            yield call(show_error);
        }else{
            yield put(push('/'));
        }
    }catch(error){
        console.log('ERROR_SAGA ', error );
    }
}

export function* workerSendEmail(action){
    const email : string = action.email;

    try {
        yield call(fetchSendEmail, email);
        yield put(push('/'));
    }catch(error){
        console.log('ERROR_SAGA ', error )
    }
    
}