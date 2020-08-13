import React from 'react'
import { reduxForm, InjectedFormProps, Field } from 'redux-form'
import { makeStyles, Typography, TextField, Button, Grid } from '@material-ui/core'
import { NavLink, useHistory } from 'react-router-dom';

interface IProps{
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

export const Authorization : React.FC<IProps & InjectedFormProps<{}, IProps>> = (props : any) => {

    const classes = useStyles()
    const history = useHistory()
    
    const handleSubmit = (values: IProps) => {
        window.alert(JSON.stringify(values));
        history.push('/todo')
     }
    return (
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Авторизация
                </Typography>
                <form onSubmit={props.handleSubmit(handleSubmit)}>
                    <Field name="email" component={renderTextField} label="email" />
                    <Field name="password" component={renderTextField} label="password" />
                    <Button
                        type="submit"
                        fullWidth
                        variant = "contained"
                        color = "primary"
                        className = {classes.submit}>
                         Войти
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <NavLink to="/reset">
                                Забыли пароль?
                            </NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to="/registration" >
                                Вы еще не зарегистрированы?<br/>Регистрация
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
    )
}

const form = reduxForm<{}, IProps>({
    form: 'auth'
})(Authorization);
    
export default form