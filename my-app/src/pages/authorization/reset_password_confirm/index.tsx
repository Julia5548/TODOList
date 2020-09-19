import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { onResetPasswordAction } from '../../../store/actions';
import Form from './components/formResetPassword';

interface IProps{
    onResetPassword : (password: string,token: number, history) => void;
    isErrorAuth : boolean;
    textError : string;
}

const useStyles = makeStyles((theme) => ({
    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    }
}));

const mapDispatchToProps = (dispatch) => (
    { 
        onResetPassword :(password: string, token: number, history) => {
            dispatch(onResetPasswordAction(password, token, history))
        }
    }
)

const mapStateToProps = (state) => ({
    isErrorAuth : state.user_data.isErrorAuth,
    textError : state.user_data.textError
})

export const ResetPassword : React.FC<IProps> = (props : IProps) => {
    
    const classes = useStyles();

    return(
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Введите новый пароль
            </Typography>
            <Form onResetPassword = {props.onResetPassword} isErrorAuth = {props.isErrorAuth} textError = {props.textError}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);