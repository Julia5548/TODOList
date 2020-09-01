import { IUser } from "../../../interface";
import { GET_TOKEN, CURRENT_USER, INITIAL_USER } from "../../actions/types";


const initialStateUser : IUser = {
    id: 0,
    username: '',
    logged_in : false
}

export function user_reducer ( state = initialStateUser, action) : IUser {
    switch(action.type){
        case GET_TOKEN:
            return { ...state, logged_in : state.logged_in = true };
        case CURRENT_USER:
            return { ...state, username : action.current_user.username, id : action.current_user.id, logged_in : true };
        case INITIAL_USER:
            localStorage.removeItem('token')
            return { ...state, username : '', id : 0, logged_in : false };
        default : return state
    }
}