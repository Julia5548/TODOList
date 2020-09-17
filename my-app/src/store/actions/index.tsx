import { TOGGLE_TASK, REMOVE_TASK, CREATE_TASK, LOGIN_USER, CREATE_USER, RESET_PASSWORD, INITIAL_USER, CURRENT_USER, GET_USER, REMOVE_TODO, CREATE_TODO, INITIAL_TASK, GET_TASK, SEND_EMAIL, GET_TODO } from "./types";
import { ITodoList } from "../../interfaces/ITodoList";
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

export const addTodoAction = (sortTodo : ITodoList) =>{
    return {
        type: CREATE_TODO,
        sortTodo
    }
}

export const removeTodoAction = (sortTodo : ITodoList) => {
    return {
        type : REMOVE_TODO,
        sortTodo
    }
}

export const getTodoAction = () =>{
    return {
        type: GET_TODO
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

export const onResetPasswordAction = (password: string, token:number, history) =>{
    return{
        type: RESET_PASSWORD,
        password,
        token,
        history
    }
}

export const onSendEmailAction = (email: string, history) =>{
    return{
        type: SEND_EMAIL,
        email,
        history
    }
}

export const onLogoutAction = () => {
    return {
        type: INITIAL_USER
    }
}

export const onInitalTaskAction = (task : ITask[]) => {
    return{
        type: INITIAL_TASK,
        task
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
export const onGetTaskAction = (idTodo : number) => {
    return{
        type: GET_TASK,
        idTodo
    }
}