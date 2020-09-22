import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { RenderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import Alert from "../../../../components/Alert/index";
import { IUser } from "../../../../interfaces/IUser";


interface IProps extends RouteComponentProps{
    onCreateUser : (newUser : IUser, history) => void;
    isErrorAuth : boolean;
    textError : string;
}

const useStyles = makeStyles((theme) => ({
    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onCreateUser, isErrorAuth, history , ...props}) => {

    const classes = useStyles();
    const submit = values => {
        
        const user : IUser = {
            username : values.username,
            email : values.email,
            password : values.password,
            id : 0,
            isLoggedIn : false,
            isErrorAuth : false
        };

        onCreateUser(user, history);
    };

    return(
        <form onSubmit={props.handleSubmit(submit)}>
            <Field name="username" component={RenderTextField} label="username" />
            <Field name="email" component={RenderTextField} label="email" />
            <Field name="password" component={RenderTextField} label="password" />
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
            {isErrorAuth && <Alert error_text = {props.textError}/>}
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form : 'sign-up'
})(Form);

export default withRouter(form);