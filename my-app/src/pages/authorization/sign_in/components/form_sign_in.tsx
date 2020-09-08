import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import Alert from "../../../../components/Alert/index";
import { IUser } from "../../../../interfaces/IUser";


interface IProps extends RouteComponentProps{
    onLoginUser(user : IUser, history) : void;
    isErrorAuth: boolean;
}

const useStyles = makeStyles((theme) => ({

    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onLoginUser, isErrorAuth, history , ...props}) => {

    const classes = useStyles()
    const submit = values => {
        const user : IUser = {
            username : values.username,
            password : values.password,
            id : 0,
            isLoggedIn : true,
            isErrorAuth : false
        };
        onLoginUser(user, history);
    };

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
            {isErrorAuth && <Alert error_text = {'Неверен логин или пароль'}/>}
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
    );
}

const form = reduxForm<{}, IProps>({
    form : 'auth'
})(Form);

export default withRouter(form);