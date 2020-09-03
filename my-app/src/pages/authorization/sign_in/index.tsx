import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Form from './components/form_sign_in';
import { onLoginUserAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { IUser } from '../../../interfaces/IUser';


interface IProps{
    onLoginUser(user : IUser, history) : void;
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
        }
    }
)

const mapStateToProps = (state) => ({
    isErrorAuth : state.user_data.isErrorAuth
})


export const Sign_In : React.FC<IProps> = (props : IProps) => {

    const classes = useStyles();

    return (
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Авторизация
            </Typography>
            <Form onLoginUser = {props.onLoginUser} isErrorAuth = {props.isErrorAuth}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Sign_In);