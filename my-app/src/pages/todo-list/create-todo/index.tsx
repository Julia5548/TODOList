import React, { useEffect, useState } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { makeStyles, Typography, TextField, Button, AppBar, Toolbar, Grid} from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { ITodo } from '../../../interfaces/ITodo';


export function validations(values){
    const error = {};
    if(!values['task']){
        error['task'] = 'Необходимо ввести наименование задачи'
    }
    return error
}

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


export const WindowTask : React.FC<ITodo> = () => {
    const classes = useStyles();
    // const { pk } = params;
    const[todoList, setTodo] = useState<ITodo[]>([])
    const [response, setResponse] = useState([''])    

    const handleSubmit = ( values : any ) => {

        // const newTask : ITodo = {
        //     id : null,
        //     user : pk,
        //     title : values.task
        //     // completed : false
        // }

        // props.onAddTask(newTask)
        // setResponse([newTask.name])
        console.log('RESPONSE_CREATE : ', response)
    }

    const onToggle = (task : ITodo) =>{
        // props.onToggle(task)
        // setResponse([task.completed + ' ' + task.name])
        console.log('RESPONSE_TOGGLE : ', response)
    }

    const onRemove = (task : ITodo) =>{
        // props.onRemove(task)
        // setResponse(['remove_task ' + task.name])
        console.log('RESPONSE_REMOVE : ', response)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        // props.onLogout()
        // history.push('/')
    }


    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log('FETCHING...')
            fetch('http://127.0.0.1:8000/api/task_list/' /*+ pk*/,
            {
                mode: 'cors',
                headers: {
                    Authorization : 'JWT ' + localStorage.getItem('token')
                },
            })
            .then(response => response.json())
            .then(data => {
                setTodo(data)
                //console.log(data)
        
            })
            .catch((error) => console.log('ERROR1: ', error))
        }
    }, [response])


    return(
        <div className = {classes.root}>
            <AppBar position = "static">
                <Toolbar>
                    <Typography variant="h6" className = {classes.title}>
                        username
                    </Typography>
                    <Button color="inherit" onClick = {() => handleLogout()}>
                        Выход
                    </Button>
                </Toolbar>
            </AppBar>
            
            {/* <ListTask todoList = { todoList } onRemove = {onRemove} onToggle = {onToggle} /> */}
           
        </div>
    )
}

// const form = reduxForm<{}, ITodo>({
//     form : 'createTask', 
//     validate: validations
// })(withRouter(WindowTask));

// export default form