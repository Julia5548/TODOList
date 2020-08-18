import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Route from '../Router'
import { ITodo } from '../interface';
import { reset } from 'redux-form';
import { call, takeEvery } from "redux-saga/effects" ;

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
        }
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

    
    yield console.log(action.newTask)

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

export function* watchRemoveTask(){
    yield takeEvery('REMOVE_TASK', workRemoveTask)
}

function* workToggleTask(action){
    
    const task : ITodo = action.task
    console.log('toggle: ', task)
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
                },
                body : JSON.stringify(task)
            }).catch(function(error){
                console.log('ERROR:' , error)
            })
        })
        yield console.log(`response = ${JSON.stringify(data)}`); 
    } catch(error){
        console.log(error)
    }
}


function* workRemoveTask(action){
    
    const task : ITodo = action.task
    console.log('remove: ', task)

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
    //setTodo(prev => prev.filter(todo => todo.id !== id))
}

const User = (props : any) => {

    const[todoList, setTodo] = useState<ITodo[]>([])

    useEffect(() => {
        console.log('Fetching...')
        const data = fetch('http://127.0.0.1:8000/api/task_list/',
        {
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            setTodo(data)
      
        })
    }, [])
    
    return (
        <Route  {...props} todoList = {todoList}/>
    );
}

export default connect(null, mapDispatchToProps)(User);