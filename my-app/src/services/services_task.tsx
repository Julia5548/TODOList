import { getCookie } from './cookie';
import { ITask } from '../interfaces/ITask';


export async function fetchGetTask(id_todo : number){

    const url = 'http://127.0.0.1:8000/api/v1/detail/todo/task/list/' + id_todo;
    
    const response = await fetch(url, {
        mode : 'cors',
        method: 'GET',
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
    })
    return await response.json();
}

export async function fetchCreateTask(newTask : ITask){
    
    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/v1/detail/todo/task/create';

    const response = fetch(url, {
        mode : 'cors',
        method: 'POST',
        headers : {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
        body : JSON.stringify(newTask)
    });
    const data = response.then(response => 
        response.json()
    ).catch(function(error){
        console.log('ERROR:' , error);
    });
    return await data;
}

export const fetchToggleTask = (task : ITask) => {

    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/v1/detail/todo/task/' + task.id ;
    
    fetch(url, {
        mode : 'cors',
        method: 'PUT',
        headers : {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
        body : JSON.stringify(task)
    }).catch(function(error){
        console.log('ERROR:' , error);
    });
}

export const fetchRemoveTask = (task : ITask) => {
    
    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/v1/detail/todo/task/' + task.id;
    
    fetch(url, {
        mode : 'cors',
        method: 'DELETE',
        headers : {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
    }).then((response) => {
        console.log('deleted : ', response);
    }).catch(function(error){
        console.log('ERROR:' , error);
    });
}