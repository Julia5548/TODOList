export interface ITodo{
    id:number | null;
    user: number;
    name:string;
    completed:boolean;
}

export interface IUser{
    id: number;
    username : string;
    password? : string;
    email? : string;
    is_logged_in : boolean;
    is_error_auth : boolean;
}
