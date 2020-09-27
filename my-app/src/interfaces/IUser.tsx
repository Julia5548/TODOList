export interface IUser{
    username : string;
    password? : string;
    email? : string;
    isLoggedIn? : boolean;
    isErrorAuth? : boolean;
    error? : any;
}