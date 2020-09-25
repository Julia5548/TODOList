import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { RenderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ITodoList } from "../../../../interfaces/ITodoList";


interface IProps {
    todoList : ITodoList[];
    selectedDate : Date,
    handleDateChange : (date) => void;
}

const useStyles = makeStyles((theme) => ({
    submit : {
        margin: theme.spacing(3.5,0,0,5),
        textAlign: 'center',
    },
    textField :{
        textAlign: 'center',
        marginLeft: theme.spacing(3),
        color: theme.palette.text.secondary,
    },
    dateGrid: {
        marginLeft: theme.spacing(5),
        textAlign: 'center',
    },
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({ todoList, selectedDate, handleDateChange, ...props}) => {

    const classes = useStyles();

    return(
        <form onSubmit = {props.handleSubmit}>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start">
                    <Grid item xs >
                        <Field name = "title" component = {RenderTextField} label = "Наименование списка" className = {classes.textField}/>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item className = {classes.dateGrid}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Выберите дату: "
                                format="dd.MM.yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
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
    form : 'create-todo'
})(Form);

export default form;