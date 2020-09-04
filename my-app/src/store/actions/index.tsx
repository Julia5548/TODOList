import { TOGGLE_TASK, REMOVE_TASK, CREATE_TASK, LOGIN_USER, CREATE_USER, RESET_PASSWORD, GET_TOKEN, INITIAL_USER, CURRENT_USER, GET_USER, REMOVE_TODO, CREATE_TODO } from "./types";
import { ITodo } from "../../interfaces/ITodo";
import { IUser } from "../../interfaces/IUser";
import { ITask } from "../../interfaces/ITask";


export const toggleTaskAction = (task : ITask) => {
    return {
        type: TOGGLE_TASK,
        task
    }
}

export const removeTaskAction = (task : ITask) => {
    return {
        type : REMOVE_TASK,
        task
    }
}

export const addTaskAction = (newTask : ITask) =>{
    return {
        type: CREATE_TASK,
        newTask
    }
}

export const addTodoAction = (sortTodo : ITodo) =>{
    return {
        type: CREATE_TODO,
        sortTodo
    }
}

export const removeTodoAction = (sortTodo : ITodo) => {
    return {
        type : REMOVE_TODO,
        sortTodo
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
