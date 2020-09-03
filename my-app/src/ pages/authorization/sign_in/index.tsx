import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Form from './components/form_sign_in';
import { IUser } from '../../../interface';
import { onLoginUserAction } from '../../../store/actions';
import { connect } from 'react-redux';


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

const mapDispatchToProps = (dispatch) => (
    { 
        onLoginUser : (user : IUser, history) => {
            dispatch(onLoginUserAction(user, history))
        }
    }
)

const mapStateToProps = (state) => ({
    is_error_auth : state.user_data.is_error_auth
})


export const Sign_In : React.FC<IProps> = (props : IProps) => {

    const classes = useStyles();

    return (
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Авторизация
            </Typography>
            <Form onLoginUser = {props.onLoginUser} is_error_auth = {props.is_error_auth}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Sign_In);