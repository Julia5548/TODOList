import { CURRENT_USER, INITIAL_USER, SHOW_ERROR, HIDE_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";


const initialStateUser : IUser = {
    id: 0,
    username: '',
    isLoggedIn : false,
    isErrorAuth : false,
    textError : ''
};

const createErrorText = (data) : string => {
    let error = '';
    if(data.username !== undefined && data.password !== undefined){
        error = "Такой пользователь существует. Пароль слишком легкий.";
    }else if (data.password !== undefined){
        error = "Пароль слишком легкий.";
    }else if (data.username !== undefined){
        error = "Такой пользователь существует.";
    }

    return error;
}

export function user_reducer ( state = initialStateUser, action) : IUser {
    switch(action.type){
        case CURRENT_USER:
            return { ...state, username : action.current_user.username, id : action.current_user.id, isLoggedIn : true, isErrorAuth: false };
        case INITIAL_USER:
            return { ...state, username : '', id : 0, isLoggedIn : false, isErrorAuth : false };
        case SHOW_ERROR : return { ...state, textError : createErrorText(action.data),  isErrorAuth : true };
        case HIDE_ERROR : return { ...state, isErrorAuth : false };
        default : return state;
    }
}