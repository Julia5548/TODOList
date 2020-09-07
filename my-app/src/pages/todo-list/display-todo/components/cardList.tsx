import React, { useState } from 'react';
import { ITodoList } from '../../../../interfaces/ITodoList';
import { makeStyles, Grid, CardHeader, Card, CardActions, Button, IconButton, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import FormDialog from '../../../../components/FormDialog';
import ListTasks from './listTask'


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
}))

export const CardTodo : React.FC<IProps> = ({todoList}: IProps) => {
    const classes = useStyles();
    const [todos, setTodos] = useState<ITodoList>(); 
    const[open, setOpen] = useState(false);
    const[isCreateTask, setIsCreateTask] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveTodo = ( todo : ITodoList) => {
        
        setOpen(false);
    };

    const handleOpen = (todo : ITodoList) => {
        setOpen(true);
        setTodos(todo);
    };

    const handleCreateTask = (todo: ITodoList) =>{
        setIsCreateTask(true)
        setTodos(todo)
    }
    
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
                                <IconButton  aria-label="add" color="primary" onClick = {() => handleCreateTask(todo)}>
                                    <Add/>
                                </IconButton>
                            }
                            title = {todo.title}
                            subheader = "Ваши задачи: "
                        />
                        <CardActions className={classes.cardMedia}>
                            {isCreateTask && (todo.id===todos!.id) ?
                                <div>
                                    <TextField
                                        fullWidth
                                        margin = 'normal'
                                        variant = 'standard'/>
                                    <Button size = "small" color = "secondary"> Добавить задачу</Button>
                                </div>
                                : null
                            }
                            <ListTasks idTodo = {todo.id!}/>
                            <Button size = "small" color = "secondary" onClick = {() => handleOpen(todo)}>
                                Удалить список
                            </Button>
                            <FormDialog 
                                removeElement = {todos!}
                                isOpen = {open}
                                isTask = {false}
                                dialogTitle = 'Удалить список?'
                                dialogContextText = "Вы действительно хотите удалить список?"
                                handleRemoveTodo = {handleRemoveTodo}
                                handeleClose = {handleClose}
                            />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}


export default CardTodo;