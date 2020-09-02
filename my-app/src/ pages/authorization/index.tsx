import React from 'react';
import  SignUp  from '../authorization/sing_up/index';
import  ResetPassword  from '../../ResetPassword/pages/ResetPassword';
import  TodoList  from '../../TodoList/pages/TodoList';
import { Switch, Route } from 'react-router-dom';


const Router = ( props : any) => {
    return(
        <Switch>
            <Route path = "/registration">
                <SignUp />
            </Route>
            <Route path = "/reset">
                {<ResetPassword  {...props} />}
            </Route>
            <Route path = "/todo/:pk">
                {<TodoList name = '' id = {1} completed = {false} user = {1} />}
            </Route> 
        </Switch>
    );
}

export default Router