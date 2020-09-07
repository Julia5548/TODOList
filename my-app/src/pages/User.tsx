import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Route from '../routes';
import { RootState } from '../store/reducers';
import {  onCurrentUserAction, onLogoutAction } from '../store/actions';
import { onGetTokenAction , onGetUserAction} from '../store/actions';
import { IUser } from '../interfaces/IUser';


const mapDispatchToProps = (dispatch) => {
    return({
        
        onGetToken : () => { 
            dispatch(onGetTokenAction()) 
        },

        onCurrentUser : (current_user: IUser) => { 
            dispatch(onCurrentUserAction(current_user))
        },
        onGetUser : () => {
            dispatch(onGetUserAction())
        },
        onLogout : () => { 
            dispatch(onLogoutAction()) 
        }
    })
}

const mapStateToProps = (state) => ({
    username : state.user_data.username,
    isErrorAuth : state.user_data.isErrorAuth
})

const User = (props : any) => {

    if (localStorage.getItem('token')){
        props.onGetToken();
    }

    const current_state_user = useSelector((state : RootState) => state.user_data.isLoggedIn);

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
                        isLoggedIn : true,
                        isErrorAuth : false
                    };
                    if(current_user.id !== undefined){
                        props.onCurrentUser(current_user);
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
        <Route {...props}/>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);