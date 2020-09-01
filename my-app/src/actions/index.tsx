import { ITodo, IUser } from "../interface";
import { TOGGLE_TASK, REMOVE_TASK, CREATE_TASK, LOGIN_USER, CREATE_USER, RESET_PASSWORD, GET_TOKEN, INITIAL_USER, CURRENT_USER, GET_USER } from "./types";


export const toggleTaskAction = (task : ITodo) => {
    return {
        type: TOGGLE_TASK,
        task
    }
}

export const removeTaskAction = (task : ITodo) => {
    return {
        type : REMOVE_TASK,
        task
    }
}

export const addTaskAction = (newTask : ITodo) =>{
    return {
        type: CREATE_TASK,
        newTask
    }
}

export const onLoginUserAction = (user : IUser, history) => {
    return {
        type : LOGIN_USER,
        user, 
        history
    }
}

export const onCreateUserAction = (user : IUser, history) => {
    return {
        type : CREATE_USER,
        user,
        history
    }
}

export const onResetPasswordAction = (email: string, history) =>{
    return{
        type: RESET_PASSWORD,
        email,
        history
    }
}

export const onGetTokenAction = () => {
    return{
        type : GET_TOKEN
    }
}

export const onLogoutAction = () => {
    return {
        type: INITIAL_USER
    }
}

export const onCurrentUserAction = (current_user : IUser) => {
    return {
        type: CURRENT_USER,
        current_user
    }
}

export const onGetUserAction = () => {
    return{
        type: GET_USER
    }
}
