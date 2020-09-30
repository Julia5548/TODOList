export interface IUser extends Record<string,any>{
    username? : string;
    password? : string;
    email? : string;
    isLoggedIn? : boolean;
    errorAuth? : any;
}