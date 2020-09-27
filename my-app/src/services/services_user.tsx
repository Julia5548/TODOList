import { getCookie } from "./cookie";
import { IUser } from "../interfaces/IUser";


const csrftoken = getCookie('csrftoken');

const dataFetch = (url : string, data) => {
    return (
        new Request(url,{
            mode : 'cors',
                headers: {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken!,
                },
            method : 'POST',
            body : JSON.stringify(data)
        })
    );
}
export async function fetchCreateUser(user : IUser){

    const create_user = {
        username : user.username,
        password : user.password!,
        email : user.email!
    };

    console.log('CREATE_USER: ', create_user);

    
    const response = fetch(dataFetch('http://127.0.0.1:8000/api/v1/users/create/', create_user))
    const data = response.then(respon => respon.json())
    .catch(error => 
        console.log('ERROR_FETCH: ', error)
    );
    return await data;
}

export async function fetchLoginUser(login_user){

    // console.log(dataFetch)
    const response = fetch(dataFetch('http://127.0.0.1:8000/api/v1/token/auth/', login_user))

    const data = response.then(response =>
        response.json()
    ).catch(error => {
        console.log('ERROR_FETCH: ', error);
    });

    return await data;
}

export const fetchResetPassword = async (password : string, token: number) => {

    console.log('RESET_PASSWORD: ', password);

    const body = {
        token: token,
        password : password
    };

   
    const response = fetch(dataFetch('http://127.0.0.1:8000/api/v1/password/reset/confirm/',body));
    const data = response.then(result => 
        result.json()
    ).catch(error => 
        console.log('ERROR_FETCH: ', error)    
    );
    return await data;
}

export const fetchSendEmail = (email : string) => {

    console.log('SEND_EMAIL: ', email);

    const body = {
        email : email
    };

    
    fetch(dataFetch('http://127.0.0.1:8000/api/v1/password/reset/',body))
    .then(response => {
        response.json();
        console.log('SEND_EMAIL : ', response);
    }).catch(error => 
        console.log('ERROR_FETCH: ', error)    
    );
}

export async function fetchGetDataUser(){

    const response = fetch('http://127.0.0.1:8000/api/v1/users/current/',
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