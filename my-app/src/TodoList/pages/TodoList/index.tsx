import React, {useState} from 'react'
import { reduxForm, InjectedFormProps, Field, reset } from 'redux-form'
import { makeStyles, Typography, TextField, Button, AppBar, Toolbar, Grid} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { ITodo } from '../../../interface'
import ListTask from '../../components/ListTask'

const renderTextField = ({
    input, 
    label,
    meta : {touched, error, invalid},
    ...custom
 }) => (
    <TextField
        autoComplete = {label}
        label = "Наименование задачи"
        margin = 'normal'
        fullWidth
        name={label}
        error={touched && invalid}
        helperText={touched && error}
        required
        type = {label}
        variant = 'standard'
        {...input}
        {...custom}
    />
)

const useStyles = makeStyles((theme) => ({

    root : {
        flexGrow : 1,
    },
    title : {
        flexGrow: 1,
    },
    submit : {
        margin: theme.spacing(3.5, 0, 0, 2),
        textAlign: 'center',
    },
    textField :{
        textAlign: 'center',
        marginLeft: theme.spacing(3),
        color: theme.palette.text.secondary,
    },
}))

export const WindowTask : React.FC<ITodo & InjectedFormProps<{}, ITodo>> = (props : any) => {

    const classes = useStyles()
    const history = useHistory()

    const handleSubmit = ( values : any ) => {

        const newTask : ITodo = {
            id : null,
            name : values.task,
            completed : false
        }

        props.onAddTask(newTask)
    }

    return(
        <div className = {classes.root}>
            <AppBar position = "static">
                <Toolbar>
                    <Typography variant="h6" className = {classes.title}>
                        Name User
                    </Typography>
                    <Button color="inherit" onClick = {() => history.push('/')}>
                        Выход
                    </Button>
                </Toolbar>
            </AppBar>
            <form onSubmit = {props.handleSubmit(handleSubmit)}>
                    <Grid container
                        spacing={2}
                        direction="row"
                        justify="center"
                        alignItems="flex-start">
                        <Grid item xs >
                            <Field name = "task" 
                            component = {renderTextField} 
                            label = "string"
                            className = {classes.textField}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                type="submit"
                                variant = "contained"
                                color = "primary"
                                className = {classes.submit}>
                                 Создать
                            </Button>
                        </Grid>
                    </Grid>
            </form>
           
        </div>
    )
}

const form = reduxForm<{}, ITodo>({
    form : 'createTask'
})(WindowTask);

export default form;