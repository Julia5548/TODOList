import React, { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Form from './components/form_sign_in';
import { onLoginUserAction, onCurrentUserAction, onLogoutAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { IUser } from '../../../interfaces/IUser';
import { fetchGetDataUser } from '../../../services/services_user';
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface IProps extends RouteComponentProps{
    onLoginUser : (user : IUser, history) => void;
    onLogout : () => void;
    onCurrentUser : (user : IUser) => void;
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
        onCurrentUser : (user : IUser) => {
            dispatch(onCurrentUserAction(user))
        },
        onLogout : () => { 
            dispatch(onLogoutAction()) 
        }
    }
)

const mapStateToProps = (state) => ({
    isErrorAuth : state.user_data.isErrorAuth
})


export const SignIn : React.FC<IProps> = ({history, onCurrentUser, onLoginUser, onLogout, isErrorAuth} : IProps) => {

    const classes = useStyles();

    useEffect(() => {
        if(localStorage.getItem('token')){
            const result = fetchGetDataUser();
            result.then((user) => {
                console.log(user)
                if(user !== undefined && user.id !== undefined){
                    onCurrentUser(user);
                    history.push(`/todo/${user.id}`);
                }else{
                    onLogout();
                }
            });
        }
    }, [onCurrentUser, history, onLogout]);

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