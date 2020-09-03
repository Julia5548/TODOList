import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { IUser } from "../../../../interface";


interface IProps extends RouteComponentProps{
    onCreateUser(newUser : IUser, history) : void;
}

const useStyles = makeStyles((theme) => ({

    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onCreateUser, history , ...props}) => {

    const classes = useStyles()

    const submit = values => {
        
        const user : IUser = {
            username : values.username,
            email : values.email,
            password : values.password,
            id : 0,
            is_logged_in : false,
            is_error_auth : false
        };
        onCreateUser(user, history);
    }


    return(
        <form onSubmit={props.handleSubmit(submit)}>
            <Field name="username" component={renderTextField} label="username" />
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
    )
}

const form = reduxForm<{}, IProps>({
    form : 'sign-up'
})(Form);

export default withRouter(form);