import React, { useState } from 'react';
import { ITodoList } from '../../../interfaces/ITodoList';
import { Button } from '@material-ui/core';
import FormDialog from '../../../components/FormDialog';
import { removeTodoAction } from '../../../store/actions';
import { connect } from 'react-redux';
import { useCallback } from 'react';


interface IProps{
    todo : ITodoList;
    onRemoveTodo : (sortTodo : ITodoList) => void;
}

const mapDispatchToProps = (dispatch) => {
    return({
        onRemoveTodo : (sortTodo : ITodoList) =>{
            dispatch(removeTodoAction(sortTodo))
        }
    });
}

export const DeletedTodo : React.FC<IProps> = ({todo, onRemoveTodo}: IProps) => {

    const[open, setOpen] = useState(false);
    
    const handleRemoveTodo = ( todo : ITodoList) => {
        onRemoveTodo(todo)
        setOpen(false);
    };

    const handleFormDialog = useCallback(
        result => {
            setOpen(result)
        }, [setOpen]
    )
    
    return(
        <div>
            <Button size = "small" color = "secondary" onClick = {() => handleFormDialog(true)}>
                Удалить список
            </Button>
            <FormDialog 
                removeElement = {todo}
                isOpen = {open}
                isTask = {false}
                dialogTitle = 'Удалить список?'
                dialogContextText = "Вы действительно хотите удалить список?"
                handleRemoveTodo = {handleRemoveTodo}
                handeleClose = {handleFormDialog}
            />
        </div> 
    );
}

export default connect(null, mapDispatchToProps)(DeletedTodo);