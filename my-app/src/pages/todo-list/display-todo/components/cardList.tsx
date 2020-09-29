import React, { useCallback, useState } from 'react';
import { ITodoList } from '../../../../interfaces/ITodoList';
import { makeStyles, Grid, CardHeader, Card, CardActions, IconButton } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import DeleteTodo from '../../delete-todo';
import ListTasks from './listTask';
import FormCreateTask from '../../create-task';
import { ITask } from '../../../../interfaces/ITask';
import { createTaskAction } from '../../../../store/actions';
import { reset } from 'redux-form';
import { connect } from 'react-redux';


interface IProps{
    todoList : ITodoList[];
    onAddTask : (newTask : ITask) => void;
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

const mapDispatchToProps = (dispatch) => {
    return({
        onAddTask : (newTask : ITask) => {
            dispatch(createTaskAction(newTask))
            dispatch(reset('create-task'))
        },

    });
}

const CardTodo : React.FC<IProps> = ({todoList, onAddTask}: IProps) => {
    const classes = useStyles();
    const [idTodo, setId] = useState<number>(0); 

    const[isCreateTask, setIsCreateTask] = useState(true);

    const handleCreateTask = useCallback( (event) =>{
        setIsCreateTask(true);
        setId(Number.parseInt(event.currentTarget.value));
    }, [setIsCreateTask]);

    const handleCLoseForm = useCallback(() => {
        setIsCreateTask(false);
        
    }, [setIsCreateTask]);

    const handleCreate = useCallback(values => {
        const newTask : ITask = {
            id_todo : idTodo!,
            title: values.title,
            is_completed : false
        };
        onAddTask(newTask);
    }, [onAddTask, idTodo]);

    return(
        <Grid container
            direction = 'row'
            justify = 'flex-start'
            alignItems = 'flex-start' 
            spacing = {1}
            className = {classes.cardGrid}
        >  
            {todoList.map((todo) =>(
                <Grid key = {todo.id} item xs={6} md={3}>
                    <Card>
                        <CardHeader
                            action= {
                                isCreateTask && (todo.id === idTodo) ?    
                                    <IconButton  aria-label="close" color="primary" onClick = {handleCLoseForm}>
                                        <Close/>
                                    </IconButton>
                                    :  
                                    <IconButton  aria-label="add" color="primary" onClick = {handleCreateTask} value = {todo.id!} >
                                        <Add/>
                                    </IconButton>   
                            }
                            title = {todo.title}
                            subheader = "Ваши задачи: "
                        />
                        <CardActions className={classes.cardMedia}>
                            {isCreateTask && (todo.id===idTodo) ?
                                <FormCreateTask onSubmit = {handleCreate} />
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

export default connect(null, mapDispatchToProps)(CardTodo);
