import React, { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Form from './components/form_sign_in';
import { onLoginUserAction, onGetUserAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IUser } from '../../../interfaces/IUser';


interface IProps{
    onLoginUser : (values : Record<string, IUser>) => void;
    onGetUser : () => void;
    errorAuth : any;
}

const useStyles = makeStyles((theme) => ({

    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
}));

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        onLoginUser : onLoginUserAction,
        onGetUser : onGetUserAction,
    }, dispatch);

const mapStateToProps = (state) => ({
    errorAuth : state.user_data.errorAuth
})


export const SignIn : React.FC<IProps> = ({onGetUser, onLoginUser,  errorAuth} : IProps) => {

    const classes = useStyles();

    useEffect(() => {
        if(localStorage.getItem('token')){
            onGetUser()
        }
    }, [onGetUser]);

    return (
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Авторизация
            </Typography>
            <Form onSubmit = {onLoginUser} errorAuth = {errorAuth}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);