import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { makeStyles, Typography, TextField, Button, Container, CssBaseline, Grid} from '@material-ui/core';
import { NavLink, Route, BrowserRouter, Switch, Redirect, useHistory } from 'react-router-dom';
import  Authorization  from '../components/Authorization';

interface IProps{
    name : string;
    email : string;
    password : string;
}
const renderTextField = 
({  input, 
    label,
    meta: { touched, error, invalid }, 
    ...custom 
}) => (
    <TextField
        autoComplete = {label}
        fullWidth
        label = {label}
        margin = 'normal'
        name={label}
        error={touched && invalid}
        helperText={touched && error}
        required
        type = {label}
        variant = 'standard'
        {...input}
        {...custom}
    />
)

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

export const Registration : React.FC<IProps & InjectedFormProps<{}, IProps>> = (props : any) => {

    const classes = useStyles()
    const history = useHistory()
    
    const handleSubmit = (values: any) => {
       window.alert(JSON.stringify(values));
       history.push('/')
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Регистрация
                </Typography>
                <form onSubmit={props.handleSubmit(handleSubmit)}>
                    <Field name="name" component={renderTextField} label="name" />
                    <Field name="email" component={renderTextField} label="email" />
                    <Field name="password" component={renderTextField} label="password" />
                   
                    <Button
                        type="submit"
                        fullWidth
                        variant = "contained"
                        color = "primary"
                        className = {classes.submit}>
                         Зарегистрироваться
                    </Button>
                    <Grid 
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="baseline">
                            <NavLink to="/" >
                               Авторизация
                            </NavLink>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

const form = reduxForm<{}, IProps>({
    form: 'registration'
})(Registration);
    
export default form