import React from 'react'
import { reduxForm, InjectedFormProps, Field } from 'redux-form'
import { makeStyles, Typography, TextField, Button, AppBar, Toolbar, Grid} from '@material-ui/core'

interface IProps{
    task : {
       name: string; 
    };
}

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
        margin: theme.spacing(5, 0, 2),
        textAlign: 'center',
    },
    textField :{
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

export const WindowTask : React.FC<IProps & InjectedFormProps<{}, IProps>> = (props : any) => {
    const { handleSubmit } = props
    const classes = useStyles()

    return(
        <div className = {classes.root}>
            <AppBar position = "static">
                <Toolbar>
                    <Typography variant="h6" className = {classes.title}>
                        Name User
                    </Typography>
                    <Button color="inherit">
                        Выход
                    </Button>
                </Toolbar>
            </AppBar>
            <form onSubmit = {handleSubmit}>
                    <Grid container
                        spacing={2}
                        alignItems="center">
                        <Grid item xs={6} >
                            <Field name = "task" 
                            component = {renderTextField} 
                            label = "string"
                            className = {classes.textField}/>
                        </Grid>
                        <Grid item xs={6}>
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

const form = reduxForm<{}, IProps>({
    form : 'createTask'
})(WindowTask);

export default form;