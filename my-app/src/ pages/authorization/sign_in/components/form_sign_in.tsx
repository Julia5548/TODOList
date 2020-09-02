import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { IUser } from "../../../../interface";
import Alert from "./alert";


interface IProps extends RouteComponentProps{
    onLoginUser(user : IUser, history) : void;
    error_sign_in: boolean;
}

const useStyles = makeStyles((theme) => ({

    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onLoginUser, error_sign_in, history , ...props}) => {

    const classes = useStyles()

    const submit = (values:any) => {
        const user : IUser = {
            username : values.username,
            password : values.password,
            id : 0,
            logged_in : true,
            error_sign_in : false
        };
        onLoginUser(user, history);
    }

    return(
        <form onSubmit= {props.handleSubmit(submit)}>
            <Field name="username" component={renderTextField} label="username" />
            <Field name="password" component={renderTextField} label="password" />
            <Button
                type="submit"
                fullWidth
                variant = "contained"
                color = "primary"
                className = {classes.submit}>
                    Войти
            </Button>
            {error_sign_in && <Alert error_text = {'Неверен логин или пароль'}/>}
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
    )
}

const form = reduxForm<{}, IProps>({
    form : 'auth'
})(Form);

export default withRouter(form);