import React from'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import { Field, reduxForm, InjectedFormProps, reset } from 'redux-form';
import { RenderTextField } from '../../../components/TextField';
import { ITask } from '../../../interfaces/ITask';
import { connect } from 'react-redux';
import { createTaskAction } from '../../../store/actions';

interface IProps{
    idTodo : number;
    onAddTask : (newTask : ITask) => void;
}

const useStyles = makeStyles((theme) => ({
    field: {
        marginLeft: theme.spacing(3),
        width : '90%'
    },
    submit: {
        marginTop : theme.spacing(1),
    },
}));

const mapDispatchToProps = (dispatch) => {
    return({
        onAddTask : (newTask : ITask) => {
            dispatch(createTaskAction(newTask))
            dispatch(reset('create-task'))
        },

    });
}

const CreateTask : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({idTodo,  onAddTask, ...props}) => {
    const classes = useStyles()
    
    const submit = values => {
        const newTask : ITask = {
            id: null,
            id_todo : idTodo,
            title: values.title,
            is_completed : false
        }
        onAddTask(newTask)
    };

    return(
        <form onSubmit = {props.handleSubmit(submit)}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            > 
                <Grid item xs>
                    <Field className = {classes.field} component= {RenderTextField} name = "title" label = "Введите наименование задачи"/>
                </Grid>
                <Grid item xs={3}>
                    <Button type = 'submit' className = {classes.submit} size = "small" color = "primary">Добавить</Button>
                </Grid>
            </Grid>
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form: 'create-task'
})(CreateTask);

export default connect(null, mapDispatchToProps)(form);