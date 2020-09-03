import { GET_TOKEN, CURRENT_USER, INITIAL_USER, SHOW_ERROR, HIDE_ERROR } from "../../actions/types";
import { IUser } from "../../../interfaces/IUser";


const initialStateUser : IUser = {
    id: 0,
    username: '',
    isLoggedIn : false,
    isErrorAuth : false
};

export function user_reducer ( state = initialStateUser, action) : IUser {
    switch(action.type){
        case GET_TOKEN:
            return { ...state, isLoggedIn : true };
        case CURRENT_USER:
            return { ...state, username : action.current_user.username, id : action.current_user.id, isLoggedIn : true, isErrorAuth: false };
        case INITIAL_USER:
            localStorage.removeItem('token');
            return { ...state, username : '', id : 0, isLoggedIn : false, isErrorAuth : false };
        case SHOW_ERROR : return { ...state, isErrorAuth : true };
        case HIDE_ERROR : return { ...state, isErrorAuth : false };
        default : return state;
    }
}