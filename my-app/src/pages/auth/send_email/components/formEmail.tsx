import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { RenderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Alert from "../../../../components/Alert/index";


interface IProps {
    errorAuth: any;
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

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({errorAuth, ...props}) => {

    const classes = useStyles();

    return(
        <form onSubmit={props.handleSubmit}>        
            <Field name="email" component={RenderTextField} label="email" type= "email" className = {classes.textField}/>
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
            {errorAuth.error && <Alert error_text = {errorAuth.error}/>}
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form : 'send-email'
})(Form);

export default form;