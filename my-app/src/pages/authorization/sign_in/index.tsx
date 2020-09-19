import React, { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Form from './components/form_sign_in';
import { onLoginUserAction, onGetUserAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { IUser } from '../../../interfaces/IUser';
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface IProps extends RouteComponentProps{
    onLoginUser : (user : IUser, history) => void;
    onGetUser : (history) => void;
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
        onLoginUser : (user : IUser, history) => {
            dispatch(onLoginUserAction(user, history))
        },
        onGetUser : (history) => {
            dispatch(onGetUserAction(history))
        },
    }
)

const mapStateToProps = (state) => ({
    isErrorAuth : state.user_data.isErrorAuth
})


export const SignIn : React.FC<IProps> = ({onGetUser, onLoginUser, history, isErrorAuth} : IProps) => {

    const classes = useStyles();

    useEffect(() => {
        if(localStorage.getItem('token')){
            onGetUser(history)
        }
    }, [onGetUser, history]);

    return (
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Авторизация
            </Typography>
            <Form onLoginUser = {onLoginUser} isErrorAuth = {isErrorAuth}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));