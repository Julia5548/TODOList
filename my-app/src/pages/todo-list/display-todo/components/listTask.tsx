import React, {  useEffect } from 'react';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';
import { ITask } from '../../../../interfaces/ITask';
import DeleteTask  from '../../delete-task';
import ToggleTask from '../../toggle-task';
import { connect } from 'react-redux';
import { onGetTaskAction } from '../../../../store/actions';


interface IProps {
    idTodo : number;
    tasks: ITask[];
    onGetTask(idTodo : number) : void;
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
      typography: {
        marginLeft : theme.spacing(1.5),
      },
}))

const mapDispatchToProps = (dispatch) => {
    return({
        onGetTask : (idTodo : number) =>{
            dispatch(onGetTaskAction(idTodo))
        }
    });
}


const mapStateToProps = (state) => ({
    tasks : state.taskData.tasks
})

export const ListTask : React.FC<IProps> = ({idTodo, tasks, onGetTask} : IProps) => {

    const classes = useStyles();

    useEffect(() => {
        try{    
            onGetTask(idTodo)
        }catch(error){ 
            console.log('ERROR: ', error);
        }
    },[idTodo, onGetTask]);

    if(tasks.find((task) => task.id_todo===idTodo) === undefined){
        return(
            <Typography className = {classes.typography} variant = "h6" component = "h6">
                Задач нет!
            </Typography>
        );
    }
    return(
        <div>
            {tasks.map((task)  => {
                let classCheked = classes.notCheck
                if(task.is_completed){
                    classCheked = classes.check
                }
                if(task.id_todo === idTodo){
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

export default connect(mapStateToProps, mapDispatchToProps)(ListTask);