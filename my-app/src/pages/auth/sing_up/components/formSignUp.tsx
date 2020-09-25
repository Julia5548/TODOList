import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { RenderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Alert from "../../../../components/Alert/index";


interface IProps {
    isErrorAuth : boolean;
    textError : string;
}

const useStyles = makeStyles((theme) => ({
    submit : {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({ isErrorAuth, ...props}) => {

    const classes = useStyles();

    return(
        <form onSubmit={props.handleSubmit}>
            <Field name="username" component={RenderTextField} label="username" type= "username"/>
            <Field name="email" component={RenderTextField} label="email" type= "email"/>
            <Field name="password" component={RenderTextField} label="password" type= "password"/>
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

export default form;