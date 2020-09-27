import { getCookie } from './cookie';
import { ITodoList } from '../interfaces/ITodoList';


const csrftoken = getCookie('csrftoken');

export const fetchCreateTodo = async (sortTodo: ITodoList) =>{
    

    const url = 'http://127.0.0.1:8000/api/v1/todo/create/';

    const response = fetch(url, {
        mode : 'cors',
        method: 'POST',
        headers : {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
        body : JSON.stringify(sortTodo)
    });
    const data = response.then(response => 
        response.json()
    ).catch(function(error){
        console.log('ERROR:' , error);
    });
    
    return await data;
}

export const fetchRemoveTodo = (sortTodo : ITodoList) => {
    
    const url = 'http://127.0.0.1:8000/api/v1/todo/delete/' + sortTodo.id + '/';
    
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

export async function fetchGetTodo(){
    
    const url = 'http://127.0.0.1:8000/api/v1/todo/list/';
    
    const response = await fetch(url, {
        mode : 'cors',
        method: 'GET',
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('token')
        },
    });

    return await response.json();
}
