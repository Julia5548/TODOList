import React from 'react';
import Form from './components/formSignUp';
import { makeStyles, Typography, Container } from '@material-ui/core';
import { onCreateUserAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { IUser } from '../../../interfaces/IUser';


interface IProps{
    onCreateUser : (user : Record<string, IUser>) => void;
    errorAuth: any;
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
        onCreateUser : (user : Record<string, IUser>) =>{ 
            dispatch(onCreateUserAction(user))
        }
    })
}

const mapStateToProps = (state) => ({
    errorAuth: state.user_data.errorAuth
})

export const SignUp  = ({onCreateUser, ...props} : IProps) => {

    const classes = useStyles();
    
    return (
        <Container component="main" maxWidth="xs">
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Регистрация
                </Typography>
                <Form onSubmit = {onCreateUser} userError = {props.errorAuth}/>
            </div>
        </Container>
    );
}
    
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);