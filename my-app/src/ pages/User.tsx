import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Route from '../Router'
import { ITodo, IUser } from '../interface';
import { reset } from 'redux-form';
import { call, takeEvery, put } from "redux-saga/effects" ;
import { RootState } from '../redux/reduxStore';


const initialStateUser : IUser = {
    id: 0,
    username: '',
    logged_in : false
}

export function user_reducer ( state = initialStateUser, action) : IUser {
    switch(action.type){
        case 'GET_TOKEN':
            return { ...state, logged_in : state.logged_in = true };
        case 'CURRENT_USER':
            return { ...state, username : action.current_user.username, id : action.current_user.id, logged_in : true };
        case 'INITIAL_USER':
            localStorage.removeItem('token')
            return { ...state, username : '', id : 0, logged_in : false };
        default : return state
    }
}

const mapDispatchToProps = (dispatch) => {

    return({
        onAddTask : (newTask : ITodo) => {
            dispatch(addTaskAction(newTask))
            dispatch(reset('createTask'))
        },
        onToggle : (task : ITodo) => {
            dispatch(toggleTaskAction(task))
        },
        onRemove : (task : ITodo) => {
            dispatch(removeTaskAction(task))
        }, 
        onLoginUser : (user : IUser, history) => {
            dispatch(onLoginUserAction(user, history))
        },
        onCreateUser : (user : IUser) => {
            dispatch(onCreateUserAction(user))
        },
        onGetToken : () => { dispatch(onGetTokenAction()) },
        onLogout : () => { dispatch(onLogoutAction()) },
        onCurrentUser : (current_user: IUser) => { dispatch(onCurrentUserAction(current_user) )},
        onGetUser : () => {dispatch(onGetUserAction())}
    })
}

const toggleTaskAction = (task : ITodo) => {
    return {
        type: 'TOGGLE_TASK',
        task
    }
}

const removeTaskAction = (task : ITodo) => {
    return {
        type : 'REMOVE_TASK',
        task
    }
}

const addTaskAction = (newTask : ITodo) =>{
    return {
        type: 'CREATE_TASK',
        newTask
    }
}

const onLoginUserAction = (user : IUser, history) => {
    return {
        type : 'LOGIN_USER',
        user, 
        history
    }
}

const onCreateUserAction = (user : IUser) => {
    return {
        type : 'CREATE_USER',
        user
    }
}

const onGetTokenAction = () => {
    return{
        type : 'GET_TOKEN'
    }
}

const onLogoutAction = () => {
    return {
        type: 'INITIAL_USER'
    }
}

const onCurrentUserAction = (current_user : IUser) => {
    return {
        type: 'CURRENT_USER',
        current_user
    }
}

const onGetUserAction = () => {
    return{
        type: 'GET_USER'
    }
}

function getCookie(name : string) {
    let cookieValue : string | null = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function* watchCreateTask(){
    yield takeEvery('CREATE_TASK', workCreateTask)
}


function* workCreateTask(action) {

   // yield console.log(action.newTask)

    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/task_create/'
        
    try{
        const data = yield call(() => {
            fetch(url, {
                mode : 'cors',
                method: 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken!,
                    Authorization : 'JWT ' + localStorage.getItem('token')
                },
                body : JSON.stringify(action.newTask)
            }).catch(function(error){
                console.log('ERROR:' , error)
            })
        })
    } catch(error){
        console.log(error)
    }
}

export function* watchToggleTask(){
    yield takeEvery('TOGGLE_TASK', workToggleTask)
}

function* workToggleTask(action){
    
    const task : ITodo = action.task
    //console.log('toggle: ', task)
    task.completed = !task.completed

    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/task_update/' + task.id + '/'
        
    try{
        const data = yield call(() => {
            fetch(url, {
                mode : 'cors',
                method: 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken!,
                    Authorization : 'JWT ' + localStorage.getItem('token')
                },
                body : JSON.stringify(task)
            }).catch(function(error){
                console.log('ERROR:' , error)
            })
        })
        //yield console.log(`response = ${JSON.stringify(data)}`); 
    } catch(error){
        console.log(error)
    }
}

export function* watchRemoveTask(){
    yield takeEvery('REMOVE_TASK', workRemoveTask)
}

function* workRemoveTask(action){
    
    const task : ITodo = action.task
    //console.log('remove: ', task)

    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/task_delete/' + task.id + '/'
        
    try{
        yield call(() => {
            fetch(url, {
                mode : 'cors',
                method: 'DELETE',
                headers : {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken!,
                    Authorization : 'JWT ' + localStorage.getItem('token')
                },
            }).then((response) => {
                console.log('deleted : ', response)
            })
            .catch(function(error){
                console.log('ERROR:' , error)
            })
        })
    } catch(error){
        console.log(error)
    }
}

export function* watch_login_user(){
    yield takeEvery('LOGIN_USER', worker_login_user)
}

function* worker_login_user(action) {
    
    const user : IUser = action.user
    const { history } = action
    const login_user = {
        username : user.username,
        password : user.password!
    }    
    try{
        const data  = yield call(() => fetch_token_auth(login_user))
       // console.log('CURRENT_USER : ', data.user)
        localStorage.setItem('token', data.token)
        const current_user = data.user
        yield put({type : 'CURRENT_USER', current_user})
        const url : string = '/todo/' + current_user.id
        history.push(url)
    }catch(error){
        console.log('ERROR: ', error)
    }
}

async function fetch_token_auth(login_user) {

    const csrftoken = getCookie('csrftoken')
    const response = fetch('http://127.0.0.1:8000/token-auth/', {
        mode : 'cors',
        method : 'POST',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
        },
        body : JSON.stringify(login_user)
    })
    const data = response.then(response => response.json())
    .catch(error => console.log('ERROR: ', error))
    return await data
}

export function* watch_create_user(){
    yield takeEvery('CREATE_USER', worker_create_user)
}

function* worker_create_user(action){
    
    const user : IUser = action.user

    const create_user = {
        username : user.username,
        password : user.password!
    }

    //console.log('CREATE_USER: ', create_user)

    const csrftoken = getCookie('csrftoken')

    yield call(() => {
        fetch('http://127.0.0.1:8000/api_users/users/create', {
            mode : 'cors',
            method : 'POST',
            headers: {
                'Content-type' : 'application/json',
                'X-CSRFToken' : csrftoken!,
            },
            body : JSON.stringify({
                'user' : {create_user}
            })
        },)
        .then(response => {
            response.json()
            //console.log('CREATE_RESULT : ', response)
        })
        .catch(error => console.log('ERROR: ', error))
    })
}
const User = (props : any) => {

    if (localStorage.getItem('token')){
        props.onGetToken()
    }

    const current_state_user = useSelector((state : RootState) => state.user_data.logged_in)

    useEffect(() => {
        if(current_state_user){
            try{
                fetch('http://127.0.0.1:8000/api_users/current_user/',
                    {
                        mode: 'cors',
                        method : 'GET',
                        headers: {
                            Authorization : 'JWT ' + localStorage.getItem('token')
                        }
                    }
                )
                .then(response => response.json())
                .then(data => {
                    const current_user : IUser = {id : data.id, username : data.username, logged_in : true}
                    if(current_user.id !== undefined){
                        props.onCurrentUser(current_user)
                        const url : string= 'todo/'+ current_user.id
                    }else{
                        props.onLogout()
                    }
                })
            }catch(error){
                console.log('ERROR: ', error)
            }
        }
    }, [current_state_user])

    
    
    return (
        <Route  {...props} />
    );
}

export default connect(null, mapDispatchToProps)(User);