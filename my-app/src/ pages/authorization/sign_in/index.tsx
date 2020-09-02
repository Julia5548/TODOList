import React, { FormEventHandler } from 'react';
import { makeStyles, Typography, InputLabelProps } from '@material-ui/core';
import { reduxForm, InjectedFormProps } from 'redux-form';
import Form from './components/form_sign_in';
import { IUser, ITodo } from '../../../interface';


interface IProps{
    onLoginUser(user : IUser, history) : void;
    error_sign_in : boolean;
}

const useStyles = makeStyles((theme) => ({

    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
}));

export const Sign_In : React.FC<IProps> = ( {
    onLoginUser,
    error_sign_in
}: IProps) => {

    const classes = useStyles();

    return (
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Авторизация
            </Typography>
            <Form onLoginUser = {onLoginUser} error_sign_in = {error_sign_in}/>
        </div>
    )
}

export default Sign_In;