import React, { useCallback } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { onResetPasswordAction } from '../../../store/actions';
import Form from './components/formResetPassword';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps<{token : string}>{
    onResetPassword : (password: string,token: number) => void;
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
        onResetPassword :(password: string, token: number) => {
            dispatch(onResetPasswordAction(password, token))
        }
    }
)

const mapStateToProps = (state) => ({
    isErrorAuth : state.user_data.isErrorAuth,
    textError : state.user_data.textError
})

export const ResetPassword : React.FC<IProps> = ({onResetPassword, ...props} : IProps) => {
    
    const classes = useStyles();
    const token: any = props.match.params.token;
    
    const handleReset = useCallback(values =>
    {
        onResetPassword(values.password, token);

    }, [onResetPassword, token]);
    
    return(
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Введите новый пароль
            </Typography>
            <Form onSubmit = {handleReset} isErrorAuth = {props.isErrorAuth} textError = {props.textError}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword));