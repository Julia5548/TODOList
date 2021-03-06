import { CURRENT_USER, SHOW_ERROR, HIDE_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";


const initialStateUser : IUser = {
    username: '',
    isLoggedIn : false,
    isErrorAuth : false, 
    errorAuth : []
};

export function user_reducer ( state = initialStateUser, action) : IUser {
    switch(action.type){
        case CURRENT_USER:
            return { ...state, username : action.current_user.username, isLoggedIn : true, isErrorAuth: false };
        case SHOW_ERROR : return { ...state, isErrorAuth : true, errorAuth: action.error };
        case HIDE_ERROR : return { ...state, isErrorAuth : false, errorAuth: [] };
        default : return state;
    }
}