export interface ITodo{
    id:number | null;
    user_id: number;
    name:string;
    completed:boolean;
}

export interface IUser{
    id: number;
    username : string;
    password? : string;
    email? : string;
    logged_in : boolean;
}
