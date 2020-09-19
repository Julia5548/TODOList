import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { RenderTextField } from "../../../../components/TextField";
import { Button, makeStyles } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Alert from "../../../../components/Alert";


interface IProps extends RouteComponentProps<{token : string}>{
    onResetPassword : (password : string, token: number, history) => void;
    isErrorAuth: boolean;
    textError: string;
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

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onResetPassword, isErrorAuth, textError, history , ...props}) => {

    const classes = useStyles();
    const token: any = props.match.params.token;

    const submit = values => {
        onResetPassword(values.password, token, history);
    };

    return(
        <form onSubmit={props.handleSubmit(submit)}>        
            <Field name="password" component={RenderTextField} label="Новый пароль" className = {classes.textField}/>
            <Button
                type="submit"
                fullWidth
                variant = "contained"
                color = "primary"
                className = {classes.submit}>
                    Изменить 
            </Button>
            {isErrorAuth && <Alert error_text = {textError}/>}
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form : 'reset-password'
})(Form);

export default withRouter(form);