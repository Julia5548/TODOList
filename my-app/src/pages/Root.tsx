import React from 'react';
import { Route,Switch, Redirect } from 'react-router-dom';
import  SignIn  from './authorization/sign_in';
import  SignUp  from './authorization/sing_up/index';
import  ResetPassword  from './authorization/reset_password/index';
import DisplayTodo from './todo-list/display-todo';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    isLoggedIn : state.user_data.isLoggedIn
})

interface IProps{
    isLoggedIn : boolean;
}

export const Root = (props: IProps) => {
    console.log(props)
    return(
        <Switch>
            <Route exact path = "/">
                <SignIn />
            </Route>
            <Route path = "/registration">
                <SignUp />
            </Route>
            <Route path = "/reset">
                <ResetPassword />
            </Route>
            <PrivateRoute path = "/todo/:pk" isLoggedIn = {props.isLoggedIn}>
                <DisplayTodo />
            </PrivateRoute> 
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
