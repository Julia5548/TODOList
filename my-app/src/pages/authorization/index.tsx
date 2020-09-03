import React from 'react';
import  SignUp  from '../authorization/sing_up/index';
import  ResetPassword  from '../authorization/reset_password/index';
import { Switch, Route } from 'react-router-dom';
import DisplayTodo from '../todo-list/display-task';


const Router = ( props : any) => {
    return(
        <Switch>
            <Route path = "/registration">
                <SignUp />
            </Route>
            <Route path = "/reset">
                <ResetPassword />
            </Route>
            <Route path = "/todo/:pk">
                <DisplayTodo />
            </Route> 
        </Switch>
    );
}

export default Router