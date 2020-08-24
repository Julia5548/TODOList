import React from 'react'
import { reduxForm, InjectedFormProps, Field } from 'redux-form'
import { makeStyles, Typography, TextField, Button, Grid } from '@material-ui/core'
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { IUser } from '../../../interface';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';


interface IProps{
    name : string;
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

export const Authorization : React.FC = (props : any) => {

    const classes = useStyles()
    const history = useHistory()

    const id_user = useSelector((state : RootState) => state.user_data.id)

    const handleSubmit = (values: IProps) => {
        const user : IUser = {
            username : values.name,
            password : values.password,
            id : 0,
            logged_in : false
        }

        props.onLoginUser(user, history)
        
    }
    
    return (
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Авторизация
                </Typography>
                <form onSubmit={props.handleSubmit(handleSubmit)}>
                    <Field name="name" component={renderTextField} label="name" />
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

const form = reduxForm({
    form: 'auth'
})(Authorization);
    
export default form