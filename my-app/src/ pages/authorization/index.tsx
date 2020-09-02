import React from 'react';
import  Registration  from '../../Registration/pages/Registration';
import  ResetPassword  from '../../ResetPassword/pages/ResetPassword';
import  TodoList  from '../../TodoList/pages/TodoList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


const Router = ( props : any) => {
    
    return(
        <div>         
                <Switch>
                    <Route path = "/registration">
                        {<Registration {...props} /> }
                    </Route>
                    <Route path = "/reset">
                        {<ResetPassword  {...props} />}
                    </Route>
                    <Route path = "/todo/:pk">
                        {<TodoList name = '' id = {1} completed = {false} user = {1} />}
                    </Route> 
                </Switch>
        </div>
    );
}

export default Router