import { getCookie } from "./cookie";
import { IUser } from "../interfaces/IUser";


export async function fetchCreateUser(user : IUser){

    const create_user = {
        username : user.username,
        password : user.password!,
        email : user.email!
    };

    console.log('CREATE_USER: ', create_user);

    const csrftoken = getCookie('csrftoken');
    const body = {'user' : {
        'username' : create_user.username,
        'email' : create_user.email,
        'password' : create_user.password
        }
    };

    const response = fetch('http://127.0.0.1:8000/api/users/create/', {
        mode : 'cors',
        method : 'POST',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
        },
        body : JSON.stringify(body)

    })
    const data = response.then(respon => respon.json())
    .catch(error => 
        console.log('ERROR_FETCH: ', error)
    );
    return await data;
}

export async function fetchLoginUser(login_user){

    const csrftoken = getCookie('csrftoken');
    const response = fetch('http://127.0.0.1:8000/token/auth/', 
    {
        mode : 'cors',
        method : 'POST',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
        },
        body : JSON.stringify(login_user)
    });

    const data = response.then(response => 
        response.json()
    ).catch(error => {
        console.log('ERROR_FETCH: ', error);
    }
    );

    return await data;
}

export const fetchResetPassword = async (password : string, token: number) => {

    console.log('RESET_PASSWORD: ', password);

    const body = {
        token: token,
        password : password
    };

    const csrftoken = getCookie('csrftoken');

    const response = fetch('http://127.0.0.1:8000/api/password/reset/confirm/', 
    {
        mode : 'cors',
        method : 'POST',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
        },
        body : JSON.stringify(body)

    });
    const data = response.then(result => 
        result.json()
    ).catch(error => 
        console.log('ERROR_FETCH: ', error)    
    );
    return await data;
}

export const fetchSendEmail = (email : string, history) => {

    console.log('SEND_EMAIL: ', email);

    const body = {
        email : email
    };

    const csrftoken = getCookie('csrftoken');

    fetch('http://127.0.0.1:8000/api/password/reset/', 
    {
        mode : 'cors',
        method : 'POST',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrftoken!,
        },
        body : JSON.stringify(body)

    }).then(response => {

        response.json();
        history.push('/');
        console.log('SEND_EMAIL : ', response);
    
    }).catch(error => 
        console.log('ERROR_FETCH: ', error)    
    );
}

export async function fetchGetDataUser(){

    const response = fetch('http://127.0.0.1:8000/api/users/current/',
    {
        mode: 'cors',
        method : 'GET',
        headers: {
            Authorization : 'JWT ' + localStorage.getItem('token')
        }
    });
    const data = response.then(response =>response.json()
    ).catch(error => 
        console.log('ERROR_FETCH: ', error)
    );

    return await data;
}