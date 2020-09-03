import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ITodo } from "../../../../interfaces/ITodo";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ITask } from "../../../../interfaces/ITask";


interface IProps extends RouteComponentProps<{pk:string}>{
    onAddTask(newTask: ITask) : void;
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
}));

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onAddTask, history , ...props}) => {

    const classes = useStyles();
    const { pk } : any = props.match.params;
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const submit = values => {
        
        const newTask : ITask = {
            id : null,
            idTodo: 0,
            title : values.task,
            isCompleted : false
        };

        onAddTask(newTask)
    };

    return(
        <form onSubmit = {props.handleSubmit(submit)}>
            <Grid container
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={3}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    </MuiPickersUtilsProvider>
            </Grid>    
        </form>
    );
}

const form = reduxForm<{}, IProps>({
    form : 'createTask'
})(Form);

export default withRouter(form);