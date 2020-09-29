import { IUser } from "../interfaces/IUser";
import { baseUrl } from "./baseUrlRequest";
import { ITodoList } from "../interfaces/ITodoList";


type Payload = Record<string, any>;
type Response = Record<string, any>;

interface RequestData<P extends Payload> extends RequestInit{
    payload? : P;
}

interface ResponseBody<R extends Response > {
    data?: R;
    status: number;
    statusText: string;
}
  
interface ResponseData<R extends Response >{ 
    response?: ResponseBody<R>;
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

const getResponseBody = async <R extends Response>(response : Response) : Promise<ResponseBody<R>> => {
    let data;
    if(response.status !== 204 && response.status < 300 ){
        data = await response.json();
    }
    return {
        data, 
        status : response.status,
        statusText : response.statusText,
    };
}

const request = async <P extends Payload, R extends Response>(
    url : string,
    data: RequestData<P>,
    token? : string,
) : Promise<ResponseData<R>> => {

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

    const responseBody = await getResponseBody<R>(response);
    
    if(responseBody.status < 200 || responseBody.status >= 300 ){
        console.log(responseBody.status, responseBody.statusText);
    }

    return response.ok 
    ? { response : responseBody}
    : {error : responseBody.data};
}

interface TokenResponse{
    token : string;
}

export const signIn =(payload : IUser) => request<IUser, TokenResponse >(
    'token/auth/', {method : 'POST',  payload},
);

export const getTodos = () => request<ITodoList, TokenResponse >(
    'detail/todos/', {method : 'GET' }, localStorage.getItem('token')!,
);