import React from 'react';
import { Route,Switch, Redirect, NavLink } from 'react-router-dom';
import  SignIn  from './auth/sign_in';
import  SignUp  from './auth/sing_up/index';
import  SendEmail  from './auth/send_email/index';
import  ResetPassword  from './auth/reset_password_confirm/index';
import DisplayTodo from './todo-list/display-todo';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    isLoggedIn : state.user_data.isLoggedIn
})

interface IProps{
    isLoggedIn : boolean;
}

const NotFound = () => (
    <div>
      <h1>404 - Not Found!</h1>
      <NavLink to="/">
            Авторизация 
      </NavLink>
    </div>
);

export const Root = (props: IProps) => {

    return(
        <Switch>
            <Route exact path = "/">
                <SignIn />
            </Route>
            <Route path = "/registration">
                <SignUp />
            </Route>
            <Route path = "/reset">
                <SendEmail />
            </Route>
            <Route path = "/confirm/password/:token">
                <ResetPassword />
            </Route>
            <PrivateRoute path = "/todo" isLoggedIn = {props.isLoggedIn}>
                <DisplayTodo />
            </PrivateRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}



function PrivateRoute({children, isLoggedIn,  ...rest}) {
    return(
        <Route
            {...rest}
            render= {({ location }) => 
                isLoggedIn ? 
                (
                    children
                ):(
                    <Redirect 
                        to= {{
                            pathname: '/',
                            state : {from : location}
                        }}
                    />
                )
            }
        />
    );
}

export default connect(mapStateToProps)(Root);
