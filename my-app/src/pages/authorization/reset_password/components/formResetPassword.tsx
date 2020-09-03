import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";


interface IProps extends RouteComponentProps{
    onResetPassword(email : string, history) : void;
    is_error_auth?: boolean;
}

const useStyles = makeStyles((theme) => ({
    submit : {
        margin: theme.spacing(3, 0, 2),
        textAlign: 'center',
    },
    textField :{
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onResetPassword, history , ...props}) => {

    const classes = useStyles();

    const submit = values => {
        onResetPassword(values.email, history);
    };

    return(
        <form onSubmit={props.handleSubmit(submit)}>        
            <Field name="email" component={renderTextField} label="email" className = {classes.textField}/>
            <Button
                type="submit"
                fullWidth
                variant = "contained"
                color = "primary"
                className = {classes.submit}>
                    Отправить 
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
    );
}

const form = reduxForm<{}, IProps>({
    form : 'reset-password'
})(Form);

export default withRouter(form);