import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ITodo } from "../../../../interfaces/ITodo";


interface IProps extends RouteComponentProps<{pk:string}>{
    onAddTask(newTask: ITodo) : void;
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

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onAddTask, history , ...props}) => {

    const classes = useStyles();
    const { pk } : any = props.match.params;

    const submit = values => {
        
        const newTask : ITodo = {
            id : null,
            user : pk,
            title : values.task
            // completed : false
        };

        onAddTask(newTask)
    };

    return(
        <form onSubmit = {props.handleSubmit(submit)}>
            <Grid container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="flex-start">
                    <Grid item xs >
                        <Field name = "task" component = {renderTextField} label = "Наименование задачи" className = {classes.textField}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Button 
                            name= "create_task"
                            type="submit"
                            variant = "contained"
                            color = "primary"
                            className = {classes.submit}>
                                Создать
                        </Button>
                    </Grid>
            </Grid>    
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form : 'createTask'
})(Form);

export default withRouter(form);