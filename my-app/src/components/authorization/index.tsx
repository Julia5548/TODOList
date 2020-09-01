import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { reduxForm } from 'redux-form';
import Form from './components/form_authorization';


const useStyles = makeStyles((theme) => ({

    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
}));

export const Authorization : React.FC = (props : any) => {

    const classes = useStyles();

    return (
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Авторизация
                </Typography>
                <Form onLoginUser = {props.onLoginUser} handleSubmit = {props.handleSubmit}/>
            </div>
    )
}

const form = reduxForm({
    form: 'auth'
})(Authorization);
    
export default form;