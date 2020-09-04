import React, { useState } from 'react';
import { ITodoList } from '../../../../interfaces/ITodoList';
import { makeStyles, Grid, CardHeader, Card, CardActions, Button, IconButton } from '@material-ui/core';
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
    const [removeTodo, setRemoveTodo] = useState<ITodoList>(); 
    const[open, setOpen] = useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveTodo = ( todo : ITodoList) => {
        
        setOpen(false);
    };

    const handleOpen = (todo : ITodoList) => {
        setOpen(true);
        setRemoveTodo(todo);
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
                                <IconButton  aria-label="add" color="primary">
                                    <Add/>
                                </IconButton>
                            }
                            title = {todo.title}
                            subheader = "Ваши задачи: "
                        />
                        <CardActions className={classes.cardMedia}>
                            <ListTasks idTodo = {todo.id!}/>
                            <Button size = "small" color = "secondary" onClick = {() => handleOpen(todo)}>
                                Удалить список
                            </Button>
                            <FormDialog 
                                removeElement = {removeTodo!}
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