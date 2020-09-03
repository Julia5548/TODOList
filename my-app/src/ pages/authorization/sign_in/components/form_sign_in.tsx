import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { IUser } from "../../../../interface";
import Alert from "../../../../components/Alert/index";


interface IProps extends RouteComponentProps{
    onLoginUser(user : IUser, history) : void;
    is_error_auth: boolean;
}

const useStyles = makeStyles((theme) => ({

    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onLoginUser, is_error_auth, history , ...props}) => {

    const classes = useStyles()

    const submit = values => {
        const user : IUser = {
            username : values.username,
            password : values.password,
            id : 0,
            is_logged_in : true,
            is_error_auth : false
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
            {is_error_auth && <Alert error_text = {'Неверен логин или пароль'}/>}
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