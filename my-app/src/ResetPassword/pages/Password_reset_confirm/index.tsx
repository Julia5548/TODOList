import React from 'react'
import { reduxForm, InjectedFormProps, Field } from 'redux-form'
import { makeStyles, Typography, TextField, Button, Grid} from '@material-ui/core'
import { NavLink, useHistory } from 'react-router-dom'

interface IProps{
    password : string;
    password_confirm : string;
}

const renderTextField = ({
    input, 
    label,
    meta : {touched, error, invalid},
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
        textAlign: 'center',
    },
    textField :{
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

export const Password_reset_confirm : React.FC<IProps & InjectedFormProps<{}, IProps>> = (props : any) => {
    
    const classes = useStyles()
    const history = useHistory()

    const handleSubmit = (values: any) => {
        console.log(JSON.stringify(values));
        history.push('/password_reset_complete')
     }

    return(
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Сброс пароля
                </Typography>
                <form onSubmit={props.handleSubmit(handleSubmit)}>
                    <Field name="password" component={renderTextField} label="password" className = {classes.textField}/>
                    <Field name="confirm password" component={renderTextField} label="confirm password" className = {classes.textField}/>
                    <Button
                        type="submit"
                        fullWidth
                        variant = "contained"
                        color = "primary"
                        className = {classes.submit}>
                         Сменить пароль
                    </Button>
                </form>
            </div>
    )
}

const form = reduxForm<{}, IProps>({
    form : 'password_reset_confirm'
})(Password_reset_confirm);

export default form;