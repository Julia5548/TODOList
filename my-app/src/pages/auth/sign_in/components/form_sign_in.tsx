import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { RenderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Alert from "../../../../components/Alert/index";


interface IProps{
    errorAuth: any;
}

const useStyles = makeStyles((theme) => ({

    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({ errorAuth, ...props}) => {

    const classes = useStyles()

    return(
        <form onSubmit= {props.handleSubmit}>
            <Field name="username" component={RenderTextField} label="username" type = "username"/>
            <Field name="password" component={RenderTextField} label="password" type = "password"/>
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
            {errorAuth.textError && <Alert error_text = {errorAuth.textError}/>}
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form : 'auth'
})(Form);

export default form;