import React from 'react';
import { connect } from 'react-redux';
import  Authorization  from '../components/Authorization';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  Registration  from '../components/Registration';
import  ResetPassword  from '../components/ResetPassword';
import  MainWindowTodo  from '../components/MainWindowTodo';

type DataUser = {
    name? : string;
    email : string;
    password:string;
    code?: string;
}

export const User = (props: any) => {

    const handleSubmit = (values: DataUser) => {
        window.alert(JSON.stringify(values));
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact render ={() => <Authorization onSubmit = {handleSubmit} {...props} /> } />
                <Route path = "/registration"  render ={() => <Registration onSubmit = {handleSubmit} {...props} /> } />
                <Route path = "/reset"  render ={() => <ResetPassword onSubmit = {handleSubmit} {...props} /> } />
                <Route path = "/todo"  render ={() => <MainWindowTodo onSubmit = {handleSubmit} {...props} /> } />
            </Switch>
        </BrowserRouter>
    );
}

export default connect(null)(User);