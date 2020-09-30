import { IUser } from "../interfaces/IUser";
import { baseUrl } from "./baseUrlRequest";
import { ITodoList } from "../interfaces/ITodoList";
import { ITask } from "../interfaces/ITask";


type Payload = Record<string, any>;
type Response = Record<string, any>;

interface RequestData<P extends Payload> extends RequestInit{
    payload? : P;
}

interface ResponseBody {
    data?: Response;
    status: number;
    statusText: string;
}
  
interface ResponseData{ 
    response?: ResponseBody;
    error?: any;
}


const prepareBodyRequest = <T extends Payload>(payload: T) : string => {
    return JSON.stringify(payload);
}

const prepareHeadersRequest = (token?: string) : Record<string, string> => {

    let headers : Record<string, string>;
    headers = {
        'Content-type' : 'application/json',
    };

    if(token) {
        headers = {
            ...headers,
            Authorization : `JWT ${token}`
        };
    }
    return headers;
}

const getResponseBody = async(response : Response) : Promise<ResponseBody> => {
    
    let data;
    if((response.status !== 204 && response.status < 300) || response.status === 400){
        data = await response.json();
    }

    return {
        data, 
        status : response.status,
        statusText : response.statusText,
    };
}

const request = async <P extends Payload>(
    url : string,
    data: RequestData<P>,
    token? : string
) : Promise<ResponseData> => {
    
    if(data.payload){
        data.body = prepareBodyRequest<Payload>(data.payload);
    }
    
    data.mode = 'cors';
    data.headers = prepareHeadersRequest(token);
 
    const requestUrl = baseUrl + url;
    let response;
    
    try{
        response = await fetch(requestUrl, data);
    }catch(error){
        console.log("Что-то не так с сетью");
    }

    const responseBody = await getResponseBody(response);
    
    if(responseBody.status < 200 || responseBody.status >= 300 ){
        console.log('error : ',responseBody);
    }

    return response.ok 
    ? { response : responseBody}
    : { error : responseBody.data};
}


export const signIn =(payload : IUser) => request<IUser >(
    'token/auth/', { method : 'POST',  payload },
);

export const signUp =(payload : IUser) => request<IUser>(
    'users/create/', { method : 'POST',  payload },
);

export const currentUser =() => request<IUser >(
    'users/current/', { method : 'GET' }, localStorage.getItem('token')!,
);

export const sendEmail =(payload : IUser) => request<IUser >(
    'password/reset/', { method : 'POST',  payload},
);

export const resetPassword =(payload) => request<IUser >(
    'password/reset/confirm/', { method : 'POST',  payload },
);

export const getTodos = () => request<ITodoList>(
    'detail/todos/', { method : 'GET' }, localStorage.getItem('token')!,
);

export const createTodo =(payload : ITodoList) => request<ITodoList >(
    'detail/todos/', { method : 'POST',  payload }, localStorage.getItem('token')!,
);

export const removeTodo =(pk:number) => request<ITodoList >(
    `detail/todo/${pk}`, { method : 'DELETE', }, localStorage.getItem('token')!,
);

export const getTasks =(todo:number) => request<ITask >(
    `detail/todo/task/list/${todo}`, { method : 'GET' }, localStorage.getItem('token')!,
);

export const createTask =(payload : ITask) => request<ITask >(
    'detail/todo/task/create', { method : 'POST',  payload }, localStorage.getItem('token')!,
);

export const toggleTask =(payload : ITask) => request<ITask >(
    `detail/todo/task/${payload.id}`, { method : 'PUT',  payload }, localStorage.getItem('token')!,
);

export const removeTask =(pk:number) => request<ITask >(
    `detail/todo/task/${pk}`, {method : 'DELETE', }, localStorage.getItem('token')!,
);