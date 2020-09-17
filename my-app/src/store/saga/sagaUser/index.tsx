import { call, delay, put, race } from "redux-saga/effects" ;
import { fetchSendEmail, fetch_create_user, fetch_login_user, fetchResetPassword } from "../../../services/services_user";
import { CURRENT_USER, HIDE_ERROR, SHOW_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";


function* show_error(){
    yield put({type : SHOW_ERROR});
    yield delay(2000);
    yield put({type : HIDE_ERROR});
}

export function* workerLoginUser(action) {
    
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
        
        history.push('/todo/' + current_user.id);

    }catch(error){
        console.log('ERROR_SAGA: ', error);
        yield call(show_error)
    }
}

export function* workerCreateUser(action){
    
    const { history } = action;
    
    try{
        const data = yield call(fetch_create_user,action.user);
        if (data.response === "error"){
            yield call(show_error)
        }else{
            history.push('/');
        }
    }catch(error){
        console.log('ERROR_SAGA_SIGN_UP ', error )
    }
}

export function* workerResetPassword(action){
    const password : string = action.password;
    const token = action.token
    const { history }  = action;

    yield call(fetchResetPassword, password, token, history);
}

export function* workerSendEmail(action){
    const email : string = action.email;
    const { history }  = action;

    yield call(fetchSendEmail, email, history);
}