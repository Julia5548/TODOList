import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Typography, Card, CardContent, IconButton, Checkbox} from '@material-ui/core';
import { ITodo } from '../../interface';
import FormDialog from '../components/FormDialog';
import { RouteComponentProps } from 'react-router';
import {  withRouter } from 'react-router-dom';
import { InjectedFormProps } from 'redux-form';



const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        padding : theme.spacing(0,3,0,3),
        margin : theme.spacing(5),
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      notCheck :{
        flex: '1 0 auto',
      },
      check: {
        flex: '1 0 auto',
        textDecoration : 'line-through',
        color: 'rgba(0, 0, 0, 0.12)',
        boxShadow: 'none',
      },
}))

interface TodoListProps extends RouteComponentProps<{pk : string}>{
    todoList : ITodo[];
    onToggle(task : ITodo) : void;
    onRemove(task : ITodo) : void;
}

export const ListTask : React.FC<TodoListProps> = (props: TodoListProps) => {

    const classes = useStyles();
    const  {todoList, onRemove, onToggle }  = props;
    
    const[open, setOpen] = useState(false);
    const pk : any = props.match.params.pk

    const todo : ITodo = {
        id : 0,
        user : pk,
        name : '',
        completed : false,

    }
    const [task, setTask] = useState(todo)

    if(todoList.length === 0 ){
        return (
            <Typography variant = "h5" component = "h5" align = 'center'>
                Задач нет!
            </Typography>
        )
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleRemoveTask = ( task : ITodo) => {
        onRemove(task)
        setOpen(false)
    }

    const handleOpen = (task : ITodo) => {
        setOpen(true)
        setTask(task)
    }

    return(
        <div>
            {todoList.map((todo) => {
                let classCheked = classes.notCheck
                if(todo.completed){
                    classCheked = classes.check
                }
                return(
                    <Card key = {todo.id}  className = {classes.root}>
                        <Checkbox
                            checked = {todo.completed}
                            name = 'checkBox_toggle_task'
                            onChange = {() => {onToggle(todo)}}/>
                        <CardContent className = {classCheked}>
                            <Typography variant = "h6" component = "h6">
                                {todo.name}
                            </Typography>
                        </CardContent>
                        <IconButton aria-label = "delete" color="secondary" edge="end" onClick = {() => handleOpen(todo)}>
                            <DeleteIcon fontSize = "small"/>
                        </IconButton>
                        <FormDialog todo = {task} handlerRemove = {handleRemoveTask} show = {open} handleDestroy = {handleClose} handleHide = {handleClose} />
                    </Card>
                    )
                })}
        </div>
    )
}

export default withRouter(ListTask)