import React, { useEffect } from 'react';
import { makeStyles, Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import FormCreateTask from './components/formCreateTodo';
import { connect } from 'react-redux';
import {  onLogoutAction, addTodoAction, getTodoAction } from '../../../store/actions';
import { reset } from 'redux-form';
import { ITodoList } from '../../../interfaces/ITodoList';
import CardTodo from './components/cardList';
import { withRouter, RouteComponentProps } from 'react-router-dom';


interface IProps extends RouteComponentProps<{pk : string}>{
    onCreateTodo : (sortTodo : ITodoList) => void;
    onLogout : () => void;
    onGetTodos: () => void;
    todos: ITodoList[];
    username: string;
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
}));

const mapDispatchToProps = (dispatch) => {
    return({
        onCreateTodo : (sortTodo : ITodoList) =>{
            dispatch(addTodoAction(sortTodo))
            dispatch(reset('create-todo'))
        },
        onLogout : () => { 
            dispatch(onLogoutAction()) 
        },
        onGetTodos: () => {
            dispatch(getTodoAction())
        },
    });
}

const mapStateToProps = (state) => ({
    todos : state.todoListData.todos,
    username: state.user_data.username
})

export const DisplayTodo : React.FC<IProps> = ({ onLogout, onGetTodos, onCreateTodo, history, ...props} : IProps) => {
    const classes = useStyles();

    useEffect(() => {
        onGetTodos()
    }, [onGetTodos])

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
                       {props.username}
                    </Typography>
                    <Button color="inherit" onClick = {() => handleLogout()}>
                        Выход
                    </Button>
                </Toolbar>
            </AppBar>
            <FormCreateTask onCreateTodo = {onCreateTodo} todoList = {props.todos}/>
            <CardTodo todoList = {props.todos}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DisplayTodo));