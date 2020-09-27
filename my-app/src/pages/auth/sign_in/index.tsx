import React, { useCallback, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Form from './components/form_sign_in';
import { onLoginUserAction, onGetUserAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { IUser } from '../../../interfaces/IUser';


interface IProps{
    onLoginUser : (user : IUser) => void;
    onGetUser : () => void;
    isErrorAuth : boolean;
}

const useStyles = makeStyles((theme) => ({

    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
}));

const mapDispatchToProps = (dispatch) => (
    { 
        onLoginUser : (user : IUser) => {
            dispatch(onLoginUserAction(user))
        },
        onGetUser : () => {
            dispatch(onGetUserAction())
        },
    }
)

const mapStateToProps = (state) => ({
    isErrorAuth : state.user_data.isErrorAuth
})


export const SignIn : React.FC<IProps> = ({onGetUser, onLoginUser,  isErrorAuth} : IProps) => {

    const classes = useStyles();
    useEffect(() => {
        if(localStorage.getItem('token')){
            onGetUser()
        }
    }, [onGetUser]);

    const handleLogin = useCallback(values => 
    {
        const user : IUser = {
            username : values.username,
            password : values.password,
        };
        onLoginUser(user);
    }, [onLoginUser]);
    
    return (
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Авторизация
            </Typography>
            <Form onSubmit = {handleLogin} isErrorAuth = {isErrorAuth}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);