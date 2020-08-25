import React from 'react';
import  Authorization  from '../Authorization/pages/Authorization';
import  Registration  from '../Registration/pages/Registration';
import  ResetPassword  from '../ResetPassword/pages/ResetPassword';
import  TodoList  from '../TodoList/pages/TodoList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


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
            </Switch>
        </BrowserRouter>
    )
}

export default Router