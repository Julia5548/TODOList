import  Authorization  from '../Authorization/pages/Authorization';
import  Registration  from '../Registration/pages/Registration';
import  ResetPassword  from '../ResetPassword/pages/ResetPassword';
import  TodoList  from '../TodoList/pages/TodoList';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Password_reset_complete  from '../ResetPassword/pages/Password_reset_complete'
import React from 'react';
import Password_Reset_Done from '../ResetPassword/pages/Password_reset_done';

const Router = ( props : any) => {
    
    const handleSubmit = (values: any) => {
        window.alert(JSON.stringify(values));
    }
    return(
        
        <BrowserRouter>
            <Switch>
                <Route exact path = "/">
                    {<Authorization {...props} /> }
                </Route>
                <Route path = "/registration">
                    {<Registration {...props} /> }
                </Route>
                <Route path = "/reset">
                    {<ResetPassword onSubmit = {handleSubmit} {...props} />}
                </Route>
                <Route path = "/todo/:pk">
                    {<TodoList  {...props} />}
                </Route> 
                <Route path = "/password_reset_complete">
                    {<Password_reset_complete />}
                </Route> 
                <Route path = "/password_reset_done">
                    {<Password_Reset_Done/>}
                </Route> 
            </Switch>
        </BrowserRouter>
    )
}

export default Router