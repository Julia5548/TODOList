import { getCookie } from './cookie';
import { ITask } from '../interfaces/ITask';


export const fetch_create_task = (newTask : ITask) =>{
    
    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/task_create/';

    fetch(url, {
        mode : 'cors',
        method: 'POST',
        headers : {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
        body : JSON.stringify(newTask)
    }).catch(function(error){
        console.log('ERROR:' , error);
    });
}

export const fetch_toggle_task = (task : ITask) => {
    
    // task.completed = !task.completed;

    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/task_update/' + task.id + '/';
    
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
        console.log('ERROR:' , error);
    });
}

export const fetch_remove_task = (task : ITask) => {
    
    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/task_delete/' + task.id + '/';
    
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