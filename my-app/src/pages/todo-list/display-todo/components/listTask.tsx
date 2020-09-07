import React from 'react';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';
import { ITask } from '../../../../interfaces/ITask';
import DeleteTask  from '../../delete-task';
import ToggleTask from '../../toggle-task';
import { connect } from 'react-redux';


interface IProps {
    idTodo : number;
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

export const ListTask : React.FC<IProps> = ({idTodo} : IProps) => {

    const classes = useStyles();
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

    if(taskList.find((task) => task.idTodoList===idTodo) === undefined){
        return(
            <Typography variant = "h6" component = "h6">
                Задач нет!
            </Typography>
        );
    }
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
                            <ToggleTask toggleTask = {task} />
                            <CardContent className = {classCheked}>
                                <Typography variant = "h6" component = "h6">
                                    {task.title}
                                </Typography>
                            </CardContent>
                            <DeleteTask removeTask = {task}/>
                        </Card>
                    );
                }
            })}
        </div>
    );
}

export default ListTask;