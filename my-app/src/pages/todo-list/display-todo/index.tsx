import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import FormCreateTask from './components/formCreateTodo';
import { connect } from 'react-redux';
import {  onLogoutAction, addTodoAction } from '../../../store/actions';
import { reset } from 'redux-form';
import { ITodoList } from '../../../interfaces/ITodoList';
import CardTodo from './components/cardList';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { fetchGetTodo } from '../../../services/servicesTodo';


interface IProps extends RouteComponentProps<{pk : string}>{
    onCreateTodo(sortTodo : ITodoList) : void;
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
}));

const mapDispatchToProps = (dispatch) => {
    return({
        onCreateTodo : (sortTodo : ITodoList) =>{
            dispatch(addTodoAction(sortTodo))
            dispatch(reset('create-todo'))
        },
        onLogout : () => { 
            dispatch(onLogoutAction()) 
        }
    });
}

const mapStateToProps = (state) => ({})

export const DisplayTodo : React.FC<IProps> = ({ onLogout, onCreateTodo, history, ...props} : IProps) => {
    const classes = useStyles();
    const [todoList, setTodoList] = useState<ITodoList[]>([]);
    const pk : any = props.match.params;

    useEffect(() => {
            try{
               fetchGetTodo(pk).then((todo) => setTodoList(todo));
            }catch(error){
                console.log('ERROR: ', error);
            }
    }, [])

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