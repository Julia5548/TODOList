import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Form from './components/form_sign_in';
import { IUser } from '../../../interface';


interface IProps{
    onLoginUser(user : IUser, history) : void;
    is_error_auth : boolean;
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
    is_error_auth
}: IProps) => {

    const classes = useStyles();

    return (
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Авторизация
            </Typography>
            <Form onLoginUser = {onLoginUser} is_error_auth = {is_error_auth}/>
        </div>
    )
}

export default Sign_In;