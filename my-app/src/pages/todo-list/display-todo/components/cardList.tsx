import React, { useState } from 'react';
import { ITodoList } from '../../../../interfaces/ITodoList';
import { makeStyles, Grid, CardHeader, Card, CardActions, IconButton } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import DeleteTodo from '../../delete-todo';
import ListTasks from './listTask';
import FormCreateTask from '../../create-task';


interface IProps{
    todoList : ITodoList[];
}

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        display: 'block',
    },
    cardGrid: {
        marginLeft : theme.spacing(3),
        width : '90%'
    },
}));

const CardTodo : React.FC<IProps> = ({todoList}: IProps) => {
    const classes = useStyles();
    const [todos, setTodos] = useState<ITodoList>(); 

    const[isCreateTask, setIsCreateTask] = useState(false);

    const handleCreateTask = (todo: ITodoList) =>{
        setIsCreateTask(true);
        setTodos(todo);
    };
    const handleCLoseForm = () =>{
        setIsCreateTask(false);
    };
    
    return(
        <Grid container
            direction = 'row'
            justify = 'flex-start'
            alignItems = 'flex-start' 
            spacing = {1}
            className = {classes.cardGrid}
        >  
            {todoList.map((todo) => (
                <Grid key = {todo.id} item xs={6} md={3}>
                    <Card>
                        <CardHeader
                            action= {
                                isCreateTask && (todo.id === todos!.id) ?    
                                    <IconButton  aria-label="close" color="primary" onClick = {() => handleCLoseForm()}>
                                        <Close/>
                                    </IconButton>
                                    :  
                                    <IconButton  aria-label="add" color="primary" onClick = {() => handleCreateTask(todo)}>
                                        <Add/>
                                    </IconButton>
                                
                            }
                            title = {todo.title}
                            subheader = "Ваши задачи: "
                        />
                        <CardActions className={classes.cardMedia}>
                            {isCreateTask && (todo.id===todos!.id) ?
                                <FormCreateTask idTodo = {todos!.id!}/>
                                : null
                            }
                            <ListTasks idTodo = {todo.id!}/>
                            <DeleteTodo todo = {todo}/>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}


export default CardTodo;