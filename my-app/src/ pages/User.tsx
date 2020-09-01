import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Route from '../routes'
import { ITodo, IUser } from '../interface';
import { reset } from 'redux-form';
import { RootState } from '../reducers';
import { addTaskAction, toggleTaskAction, removeTaskAction, onLogoutAction, onCurrentUserAction } from '../actions';
import { onLoginUserAction, onCreateUserAction, onResetPasswordAction, onGetTokenAction , onGetUserAction} from '../actions';


const mapDispatchToProps = (dispatch) => {
    return({
        onAddTask : (newTask : ITodo) => {
            dispatch(addTaskAction(newTask))
            dispatch(reset('createTask'))
        },
        onToggle : (task : ITodo) => {
            dispatch(toggleTaskAction(task))
        },
        onRemove : (task : ITodo) => {
            dispatch(removeTaskAction(task))
        }, 
        onLoginUser : (user : IUser, history) => {
            dispatch(onLoginUserAction(user, history))
        },
        onCreateUser : (user : IUser, history) => {
            dispatch(onCreateUserAction(user, history))
        },
        onResetPassword : (email: string, history) => {
            dispatch(onResetPasswordAction(email, history))
        },
        onGetToken : () => { 
            dispatch(onGetTokenAction()) 
        },
        onLogout : () => { 
            dispatch(onLogoutAction()) 
        },
        onCurrentUser : (current_user: IUser) => { 
            dispatch(onCurrentUserAction(current_user))
        },
        onGetUser : () => {
            dispatch(onGetUserAction())
        }
    })
}

const mapStateToProps = (state) => ({
    username : state.user_data.username
})

const User = (props : any) => {

    if (localStorage.getItem('token')){
        props.onGetToken();
    }

    const current_state_user = useSelector((state : RootState) => state.user_data.logged_in);

    useEffect(() => {
        if(current_state_user){
            try{
                fetch('http://127.0.0.1:8000/api_users/current_user/',
                    {
                        mode: 'cors',
                        method : 'GET',
                        headers: {
                            Authorization : 'JWT ' + localStorage.getItem('token')
                        }
                    }
                )
                .then(response => 
                    response.json()
                )
                .then(data => {
                    const current_user : IUser = {
                        id : data.id, 
                        username : data.username, 
                        logged_in : true
                    };
                    if(current_user.id !== undefined){
                        props.onCurrentUser(current_user);
                        const url : string= 'todo/'+ current_user.id;
                    }else{
                        props.onLogout();
                    }
                })
            }catch(error){
                console.log('ERROR: ', error)
            }
        }
    }, [current_state_user])

    return (
        <Route  {...props} />
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);