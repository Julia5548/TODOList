import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { renderTextField } from "../../../../components/TextField";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ITodoList } from "../../../../interfaces/ITodoList";


interface IProps extends RouteComponentProps<{pk:string}>{
    todoList : ITodoList[];
    onCreateTodo(sortTodo : ITodoList) : void;
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

const Form : React.FC<IProps & InjectedFormProps<{}, IProps>> = ({onCreateTodo, todoList, history , ...props}) => {

    const classes = useStyles();
    const { pk } : any = props.match.params;

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const submit = values => {
        
        const month = selectedDate.getMonth() + 1;
        const date : string =  " " + selectedDate.getDate().toString() + "." +  month.toString() + "." + selectedDate.getFullYear().toString();

        const sortTodo : ITodoList ={
            id: null, 
            user: pk,
            title : values.title + date 
        }; 

        if(todoList.find((todo) => todo.title === sortTodo.title) === undefined){
            onCreateTodo(sortTodo);
        }
    };

    return(
        <form onSubmit = {props.handleSubmit(submit)}>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start">
                    <Grid item xs >
                        <Field name = "title" component = {renderTextField} label = "Наименование списка" className = {classes.textField}/>
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

export default withRouter(form);