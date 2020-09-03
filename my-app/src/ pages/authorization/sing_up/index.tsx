import React from 'react';
import Form from './components/formSignUp';
import { makeStyles, Typography, Container, CssBaseline} from '@material-ui/core';
import { onCreateUserAction } from '../../../store/actions';
import { IUser } from '../../../interface';
import { connect } from 'react-redux';


interface IProps{
    onCreateUser(user : IUser, history) : void;
    is_error_auth : boolean;
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
        onCreateUser : (user : IUser, history) =>{ 
            dispatch(onCreateUserAction(user, history))
        }
    })
}

const mapStateToProps = (state) => ({
    is_error_auth : state.user_data.is_error_auth
})

export const SignUp  = (props : IProps) => {

    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Регистрация
                </Typography>
                <Form onCreateUser = {props.onCreateUser} is_error_auth = {props.is_error_auth}/>
            </div>
        </Container>
    )
}
    
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);