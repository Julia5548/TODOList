import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import  Sign_In from '../ pages/authorization/sign_in';
import AuthRouter from '../ pages/authorization/index'
import { IUser } from '../interface';
import { InjectedProps } from '@material-ui/core';


interface IProps {
    onLoginUser(user : IUser, history) : void;
    error_sign_in : boolean;
}

const Routers : React.FC<IProps> = ({onLoginUser, error_sign_in} : IProps) => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/">
                    {<Sign_In onLoginUser= {onLoginUser} error_sign_in = {error_sign_in}/> }
                </Route>
                <AuthRouter/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routers