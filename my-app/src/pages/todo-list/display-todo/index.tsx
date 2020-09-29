import React, { useCallback, useEffect } from 'react';
import { makeStyles, Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import FormCreateTask from './components/formCreateTodo';
import { connect } from 'react-redux';
import {  onLogoutAction, createTodoAction, getTodoAction } from '../../../store/actions';
import { reset } from 'redux-form';
import { ITodoList } from '../../../interfaces/ITodoList';
import CardTodo from './components/cardList';
import { push } from 'connected-react-router';


interface IProps{
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
            dispatch(createTodoAction(sortTodo))
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

export const DisplayTodo : React.FC<IProps> = ({ onLogout, onGetTodos, onCreateTodo, ...props} : IProps) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    useEffect(() => {
        onGetTodos();
    }, [onGetTodos]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        onLogout();
        push('/');
    },[onLogout]);

    const handleDateChange = useCallback (date => {
        setSelectedDate(date);
    },[]);

    const handleCreate =useCallback( values => {
        
        const month = selectedDate.getMonth() + 1;
        const date : string =  ` ${selectedDate.getDate()}.${month}.${selectedDate.getFullYear()}`;

        const sortTodo : ITodoList ={
            id: null, 
            title : values.title + date 
        }; 

        if(!props.todos.find((todo) => todo.title === sortTodo.title)){
            onCreateTodo(sortTodo);
        }
    },[selectedDate, props.todos, onCreateTodo]);

    return(
        <div className = {classes.root}>
            <AppBar position = "static">
                <Toolbar>
                    <Typography variant="h6" className = {classes.title}>
                       {props.username}
                    </Typography>
                    <Button color="inherit" onClick = {handleLogout}>
                        Выход
                    </Button>
                </Toolbar>
            </AppBar>
            <FormCreateTask onSubmit={handleCreate} selectedDate = {selectedDate} todoList = {props.todos} handleDateChange = {handleDateChange}/>
            <CardTodo todoList = {props.todos}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodo);