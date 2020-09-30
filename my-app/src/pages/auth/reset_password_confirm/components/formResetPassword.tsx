import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { RenderTextField } from "../../../../components/TextField";
import { Button, makeStyles } from "@material-ui/core";
import Alert from "../../../../components/Alert";


interface IProps {
    errorAuth : any;
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
    console.log(errorAuth)
    return(
        <form onSubmit={props.handleSubmit}>        
            <Field name="password" component={RenderTextField} label="Новый пароль" type= "password" className = {classes.textField}/>
            <Button
                type="submit"
                fullWidth
                variant = "contained"
                color = "primary"
                className = {classes.submit}>
                    Изменить 
            </Button>
            {errorAuth.error && <Alert error_text = {errorAuth.error}/>}
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form : 'reset-password'
})(Form);

export default form;