import React from'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { RenderTextField } from '../../../components/TextField';


const useStyles = makeStyles((theme) => ({
    field: {
        marginLeft: theme.spacing(3),
        width : '90%'
    },
    submit: {
        marginTop : theme.spacing(1),
    },
}));


const CreateTask : React.FC<InjectedFormProps> = ({...props}) => {
    const classes = useStyles();
    
    return(
        <form onSubmit = {props.handleSubmit}>
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

const form = reduxForm({
    form: 'create-task'
})(CreateTask);

export default form;