import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Route from '../Router'
import { ITodo } from '../interface';
import { reset } from 'redux-form';
import { call, put, takeEvery } from "redux-saga/effects" ;

const mapDispatchToProps = (dispatch) => {

    return({
        onAddTask : (newTask : ITodo) => {
            dispatch(addTaskAction(newTask))
        }
    })
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

export function* watchUpdateTask(){
    yield takeEvery('UPDATE_TASK', workUpdateTask)
}

function* workUpdateTask(){
    console.log('update')
}

function* workCreateTask(action) {

    console.log(action.newTask)
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
        yield console.log(`response = ${JSON.stringify(data)}`); 
    } catch(error){
        console.log(error)
    }
}

export const User = (props : any) => {
    return (
        <Route {...props}/>
    );
}

export default connect(null, mapDispatchToProps)(User);