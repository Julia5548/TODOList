import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import  Sign_In from '../pages/authorization/sign_in';
import AuthRouter from '../pages/authorization/index'
import { ConnectedRouter } from 'connected-react-router';


const history = createBrowserHistory()

const Routers = () =>(
    <ConnectedRouter history = {history}>
        <Switch>
            <Route exact path = "/">
                <Sign_In />
            </Route>
            <AuthRouter/>
        </Switch>
    </ConnectedRouter>
)

export default Routers