import { IUser } from "../../../interface";
import { GET_TOKEN, CURRENT_USER, INITIAL_USER, SHOW_ERROR, HIDE_ERROR } from "../../actions/types";


const initialStateUser : IUser = {
    id: 0,
    username: '',
    is_logged_in : false,
    is_error_auth : false
};

export function user_reducer ( state = initialStateUser, action) : IUser {
    switch(action.type){
        case GET_TOKEN:
            return { ...state, is_logged_in : state.is_logged_in = true };
        case CURRENT_USER:
            return { ...state, username : action.current_user.username, id : action.current_user.id, is_logged_in : true, is_error_auth: false };
        case INITIAL_USER:
            localStorage.removeItem('token');
            return { ...state, username : '', id : 0, is_logged_in : false, is_error_auth : false };
        case SHOW_ERROR : return { ...state, is_error_auth : true };
        case HIDE_ERROR : return { ...state, is_error_auth : false };
        default : return state;
    }
}