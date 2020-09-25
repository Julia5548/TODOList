import React, { useCallback } from 'react';
import Form from './components/formSignUp';
import { makeStyles, Typography, Container } from '@material-ui/core';
import { onCreateUserAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { IUser } from '../../../interfaces/IUser';


interface IProps{
    onCreateUser : (user : IUser) => void;
    isErrorAuth : boolean;
}

const useStyles = makeStyles((theme) => ({

    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}))

const mapDispatchToProps = (dispatch) => {
    return({
        onCreateUser : (user : IUser) =>{ 
            dispatch(onCreateUserAction(user))
        }
    })
}

const mapStateToProps = (state) => ({
    isErrorAuth : state.user_data.isErrorAuth
})

export const SignUp  = ({onCreateUser, ...props} : IProps) => {

    const classes = useStyles();

    const handleCreateUser = useCallback(values => {
        const user : IUser = {
            username : values.username,
            email : values.email,
            password : values.password,
        };

        onCreateUser(user);

    }, [onCreateUser]);

    return (
        <Container component="main" maxWidth="xs">
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Регистрация
                </Typography>
                <Form onSubmit = {handleCreateUser} isErrorAuth = {props.isErrorAuth} textError = {"nya"}/>
            </div>
        </Container>
    );
}
    
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);