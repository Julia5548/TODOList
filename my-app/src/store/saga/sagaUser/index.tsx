import { call, delay, put, race, take } from "redux-saga/effects" ;
import { fetchSendEmail, fetchCreateUser, fetchLoginUser, fetchResetPassword, fetchGetDataUser } from "../../../services/services_user";
import { HIDE_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";
import { push } from 'connected-react-router';
import { hideErrorAction, onCurrentUserAction, onLogoutAction, showErrorAction } from "../../actions";
import { signIn } from "../../../services/index";


function* show_error(data?){

    yield put(showErrorAction(data));
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
    try{
        // const data  = yield call(fetchLoginUser, user);
        const result  = yield call(signIn, user);
        console.log(result)
        localStorage.setItem('token', result.response.data.token);
        
        const current_user = result.response.data.user;
        
        yield put(onCurrentUserAction(current_user));
        yield put(push('/todo'));

    }catch(error){
        console.log('ERROR_SAGA: ', error);
        const textError = 'Неверен логин или пароль';
        yield call(show_error, { textError });
    }
}

export function* workerCreateUser(action){
    try{
        const responseData = yield call(fetchCreateUser,action.user);
        if (responseData.token){
            yield put(push('/'));
        }else{
            let error;
            if(responseData.username && responseData.password){
                error = "Такой пользователь существует. Пароль слишком легкий.";
            }else if (responseData.password){
                error = "Пароль слишком легкий.";
            }else if (responseData.username){
                error = "Такой пользователь существует.";
            }
            if (error){
                yield call(show_error, { error });
            }
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