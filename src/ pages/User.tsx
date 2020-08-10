import React from 'react';
import { connect } from 'react-redux';
import  Authorization  from '../Authorization/pages/Authorization';
import  Registration  from '../Registration/pages/Registration';
import  ResetPassword  from '../ResetPassword/pages/ResetPassword';
import  TodoList  from '../TodoList/pages/TodoList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export const User = (props: any) => {

    const handleSubmit = (values: any) => {
        window.alert(JSON.stringify(values));
    }
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact render ={() => <Authorization {...props} /> } />
                <Route path = "/registration"  render ={() => <Registration {...props} /> } />
                <Route path = "/reset"  render ={() => <ResetPassword onSubmit = {handleSubmit} {...props} /> } />
                <Route path = "/todo"  render ={() => <TodoList {...props}/>}/> 
            </Switch>
        </BrowserRouter>
    );
}

export default connect(null)(User);