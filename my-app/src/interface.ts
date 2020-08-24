export interface ITodo{
    id:number | null;
    name:string;
    completed:boolean;
}

export interface IUser{
    id: number;
    username : string;
    password? : string;
    logged_in : boolean;
}
