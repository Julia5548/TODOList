import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Route from '../Router'
import { ITodo } from '../interface';
import { reset } from 'redux-form';
import { call, put, takeEvery } from "redux-saga/effects" ;


export const  User = (props : any) => {
    const[todoList, setTodo] = useState<ITodo[]>([])

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

    useEffect(() => {
    console.log('Fetching...')
    fetch('http://127.0.0.1:8000/api/task_list/',
        {
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            setTodo(data)
        })
    }, [])
    
    const CREATE_TASK = "CREATE_TASK"

    function* watchCreateTask(values : any){
        yield takeEvery(CREATE_TASK, () => workerCreateTask(values))
    }
    function* workerCreateTask(values: any ) {
    
        const newTodo : ITodo = {
            name : values.task,
            id : Date.now(),
            completed : false
        }
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
                    body : JSON.stringify(newTodo)
                }).catch(function(error){
                    console.log('ERROR:' , error)
                })
            })
            yield put(requestSuccess(data))
            
        }catch(error){}
        

    }

    const requestSuccess = (data : any) =>{
        console.log(data.message)
        props.dispatch(reset('createTask'))
        return data
    }
        
    const toggleHandler = (id:number) =>{
        setTodo(prev =>
            prev.map(todo => {
                if(todo.id === id){
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
    }
    
    const resultRemove = (id : number) => {
        console.log(id)
        const csrftoken = getCookie('csrftoken');
        fetch('http://127.0.0.1:8000/api/task_delete/'+ id + '/', {
            mode : 'cors',
            method: 'DELETE',
            headers : {
                'Content-type' : 'application/json',
                'X-CSRFToken' : csrftoken!,
        
            },
        }).catch(function(error){
            console.log('ERROR:' , error)
        })
        setTodo(prev => prev.filter(todo => todo.id !== id))
    }

    return (
        <Route/>
    );
}

export default connect(null)(User);