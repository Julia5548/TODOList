import React, {useState} from 'react'
import { reduxForm, InjectedFormProps, Field, reset } from 'redux-form'
import { makeStyles, Typography, TextField, Button, AppBar, Toolbar, Grid} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { ITodo } from '../../../interface'
import ListTask from '../../components/ListTask'
import { isNull } from 'util'


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

    const[todoList, setTodo] = useState<ITodo[]>([])


    function getCookie(name : string) {
        let cookieValue : string | null = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function componentDidMount() {
        console.log('Fetching...')
        fetch('http://127.0.0.1:8000/api/task_list/',
         {
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
                setTodo(data)
            }
        )
    }

    const handleSubmit = (values: any) => {
        
        const newTodo : ITodo  =  {
            name : values.task,
            id : Date.now(),
            completed : false
        }

        setTodo(prev => [newTodo, ...prev])
        const csrftoken = getCookie('csrftoken');

        const url = 'http://127.0.0.1:8000/api/task_create/'

        fetch(url, {
            mode : 'cors',
            method: 'POST',
            headers : {
                'Content-type' : 'application/json',
                'X-CSRFToken' : csrftoken!,

            },
            body : JSON.stringify(newTodo)
        }).catch(function(error){
            console.log('ERROR:' , error)
        })
        
        console.log(newTodo)
        
        props.dispatch(reset('createTask'))
    }

     const toggleHandler = (id:number) =>{
         setTodo(prev => 
             prev.map(todo => {
                 if(todo.id === id){
                     todo.completed = !todo.completed
                 }
                 return todo
             }) 
         )
     }

     const resultRemove = (id : number) => {
         console.log(id)
        const csrftoken = getCookie('csrftoken');
        fetch('http://127.0.0.1:8000/api/task_delete/'+ id + '/', {
            mode : 'cors',
            method: 'DELETE',
            headers : {
                'Content-type' : 'application/json',
                'X-CSRFToken' : csrftoken!,

            },
        }).catch(function(error){
            console.log('ERROR:' , error)
        })
        setTodo(prev => prev.filter(todo => todo.id !== id))
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
            <ListTask todoList = {todoList} onRemove = {resultRemove} onToggle = {toggleHandler}  {...props} />                
        </div>
    )
}

const form = reduxForm<{}, ITodo>({
    form : 'createTask'
})(WindowTask);

export default form;