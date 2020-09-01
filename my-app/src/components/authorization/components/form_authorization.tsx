import React, { FormEventHandler } from "react";
import { Field } from "redux-form";
import { IUser } from "../../../interface";
import { renderTextField } from "../../TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";


interface IProps extends RouteComponentProps{
    onLoginUser(user : IUser, history) : void;
    handleSubmit(submitOrEvent) : FormEventHandler;
}

const useStyles = makeStyles((theme) => ({

    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps> = ({
    onLoginUser,
    handleSubmit,
    history
}: IProps) => {

    const classes = useStyles()

    const submit = (values: IUser) => {
        const user : IUser = {
            username : values.username,
            password : values.password,
            id : 0,
            logged_in : true
        };
        
        onLoginUser(user, history);
    }

    return(
        <form onSubmit={handleSubmit(submit)}>
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

export default withRouter(Form);