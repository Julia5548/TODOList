import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import  Sign_In from '../ pages/authorization/sign_in';
import AuthRouter from '../ pages/authorization/index'
import { IUser } from '../interface';
import { ConnectedRouter } from 'connected-react-router';


interface IProps {
    onLoginUser(user : IUser, history) : void;
    is_error_auth : boolean;
}

const Routers : React.FC<IProps> = ({onLoginUser, is_error_auth} : IProps) => {

    const history = createBrowserHistory()
    return(
        <ConnectedRouter history = {history}>
            <Switch>
                <Route exact path = "/">
                    {<Sign_In onLoginUser= {onLoginUser} is_error_auth = {is_error_auth}/> }
                </Route>
                <AuthRouter/>
            </Switch>
        </ConnectedRouter>
    )
}

export default Routers