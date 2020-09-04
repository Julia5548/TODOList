import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Typography, Card, CardContent, IconButton, Checkbox} from '@material-ui/core';
import { ITask } from '../../../../interfaces/ITask';
import  FormDialog  from '../../../../components/FormDialog';
import { toggleTaskAction, removeTaskAction } from '../../../../store/actions';
import { connect } from 'react-redux';


interface TodoListProps {
    idTodo : number;
    onToggle(task : ITask) : void;
    onRemove(task : ITask) : void;
}

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        paddingRight : theme.spacing(3),
        margin : theme.spacing(1),
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

const mapDispatchToProps = (dispatch) => {
    return({
        onToggle : (task : ITask) => {
            dispatch(toggleTaskAction(task))
        },
        onRemove : (task : ITask) => {
            dispatch(removeTaskAction(task))
        },
    })
}

export const ListTask : React.FC<TodoListProps> = ({idTodo} : TodoListProps) => {

    const classes = useStyles();
    const [removeTask, setRemoveTask] = useState<ITask>(); 
    const taskList : ITask[] = [
        {
            id: 7,
            idTodoList : 1,
            title : 'покормить кота',
            isCompleted : false,
        },
        {
            id: 5,
            idTodoList : 1,
            title : 'покормить себя',
            isCompleted : true,
        },
        {
            id: 6,
            idTodoList : 1,
            title : 'покормить брата',
            isCompleted : false,
        },
    ];
    
    const[open, setOpen] = useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveTask = ( task : ITask) => {
        console.log('Задача удалена : ', task);
        setOpen(false);
    };

    const handleOpen = (task : ITask) => {
        setOpen(true);
        setRemoveTask(task);
    };

    const onToggle = (task : ITask) =>{
        // props.onToggle(task)
        task.isCompleted = !task.isCompleted;
        console.log(task);
    };
    
    return(
        <div>
            {taskList.map((task) => {
                let classCheked = classes.notCheck
                if(task.isCompleted){
                    classCheked = classes.check
                }
                if(task.idTodoList === idTodo){
                    return(
                        <Card key = {task.id}  className = {classes.root}>
                            <Checkbox
                                checked = {task.isCompleted}
                                name = 'checkBox_toggle_task'
                                onChange = {() => onToggle(task)}/>
                            <CardContent className = {classCheked}>
                                <Typography variant = "h6" component = "h6">
                                    {task.title}
                                </Typography>
                            </CardContent>
                            <IconButton aria-label = "delete" color="secondary" edge="end" onClick = {() => handleOpen(task)}>
                                <DeleteIcon fontSize = "small"/>
                            </IconButton>
                            <FormDialog 
                                removeElement = {removeTask!}
                                isOpen = {open}
                                isTask = {true}
                                dialogTitle = 'Удалить задачу?'
                                dialogContextText = "Вы действительно хотите удалить данную задачу?"
                                handlerRemove = {handleRemoveTask}
                                handeleClose = {handleClose}
                            />
                        </Card>
                    );
                }
                })}
        </div>
    );
}

export default connect(null, mapDispatchToProps)(ListTask);