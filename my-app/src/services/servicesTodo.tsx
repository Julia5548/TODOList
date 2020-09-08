import { getCookie } from './cookie';
import { ITodoList } from '../interfaces/ITodoList';


export const fetchCreateTodo = (sortTodo: ITodoList) =>{
    
    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/todo_create/';

    fetch(url, {
        mode : 'cors',
        method: 'POST',
        headers : {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
        body : JSON.stringify(sortTodo)
    }).catch(function(error){
        console.log('ERROR:' , error);
    });
}

export const fetchRemoveTodo = (sortTodo : ITodoList) => {
    
    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8000/api/todo_delete/' + sortTodo.id + '/';
    
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

export async function fetchGetTodo(user_id : number){
    
    const url = 'http://127.0.0.1:8000/api/todo_list/' + user_id;
    
    const response = await fetch(url, {
        mode : 'cors',
        method: 'GET',
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
    });

    return await response.json();
}
