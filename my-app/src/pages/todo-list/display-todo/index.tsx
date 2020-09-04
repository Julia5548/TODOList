import React from 'react';
import { makeStyles, Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import FormCreateTask from './components/formCreateTodo';
import { connect } from 'react-redux';
import { addTaskAction, onLogoutAction, addTodoAction } from '../../../store/actions';
import { reset } from 'redux-form';
import { ITask } from '../../../interfaces/ITask';
import { ITodo } from '../../../interfaces/ITodo';
import CardTodo from './components/cardList';
import { withRouter, RouteComponentProps } from 'react-router-dom';


interface IProps extends RouteComponentProps{
    onAddTask(newTask : ITask) : void;
    onCreateTodo(sortTodo : ITodo) : void;
    onLogout(): void;
}

const useStyles = makeStyles((theme) => ({

    root : {
        flexGrow : 1,
    },
    title : {
        flexGrow: 1,
    },
    cardMedia: {
        display: 'block',
    },
}))

const mapDispatchToProps = (dispatch) => {
    return({
        onAddTask : (newTask : ITask) => {
            dispatch(addTaskAction(newTask))
        },
        onCreateTodo : (sortTodo : ITodo) =>{
            dispatch(addTodoAction(sortTodo))
            dispatch(reset('createTodo'))
        },
        onLogout : () => { 
            dispatch(onLogoutAction()) 
        }
    });
}

const mapStateToProps = (state) => ({})

export const DisplayTodo : React.FC<IProps> = ({onAddTask, onLogout, onCreateTodo, history} : IProps) => {
    const classes = useStyles();
    const todoList : ITodo[]= [
        {
            id:1,
            user:1,
            title : '1.8.2020'
        }, 
        {
            id:3,
            user:1,
            title : '2.8.2020'
        },
        {
            id:2,
            user:1,
            title : '2.8.2020'
        }
    ]

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        history.push('/');
    };

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
            <FormCreateTask onCreateTodo = {onCreateTodo} todoList = {todoList}/>
            <CardTodo todoList = {todoList}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DisplayTodo));