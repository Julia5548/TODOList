import { call, delay, put, race } from "redux-saga/effects" ;
import { fetchSendEmail, fetchCreateUser, fetchLoginUser, fetchResetPassword, fetchGetDataUser } from "../../../services/services_user";
import { CURRENT_USER, HIDE_ERROR, INITIAL_USER, SHOW_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";


function* show_error(data?){

    const { showError } = yield race({
        showError: put({type: SHOW_ERROR, data}),
        cancel: call(() => startDelay)
      });

    const startDelay = yield delay(3000);

    if (showError) {
        yield put({type : HIDE_ERROR});
    }
}

export function* workGetUser(action){
    const { history } = action;
    
    try{
        const current_user = yield call(fetchGetDataUser);
        if(current_user !== undefined && current_user.id !== undefined){
            yield put({type: CURRENT_USER, current_user})
            history.push(`/todo/${current_user.id}`);
        }else{
            localStorage.removeItem('token');
            yield put({type: INITIAL_USER})
        }
    } catch(error){
        console.log('ERROR_SAGA ', error);
    }
}

export function* workerLoginUser(action) {
    
    const user : IUser = action.user;
    const { history } = action;
    const login_user = {
        username : user.username,
        password : user.password!
    };
    try{
        const data  = yield call(fetchLoginUser,login_user);
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
        const data = yield call(fetchCreateUser,action.user);
        if (data !== undefined){
            yield call(show_error, data);
        }else{
            history.push('/');
        }
    }catch(error){
        console.log('ERROR_SAGA_SIGN_UP ', error );
    }
}

export function* workerResetPassword(action){
    const password : string = action.password;
    const token = action.token;
    const { history }  = action;
    try {
        const data = yield call(fetchResetPassword, password, token);
        if(data !== undefined){
            yield call(show_error, data);
        }else{
            history.push('/');
        }
    }catch(error){
        console.log('ERROR_SAGA ', error );
    }
}

export function* workerSendEmail(action){
    const email : string = action.email;
    const { history }  = action;
    
    try {
        yield call(fetchSendEmail, email, history);
    }catch(error){
        console.log('ERROR_SAGA ', error )
    }
    
}