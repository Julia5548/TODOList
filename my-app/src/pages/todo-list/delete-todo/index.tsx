import React, { useState } from 'react';
import { ITodoList } from '../../../interfaces/ITodoList';
import { Button } from '@material-ui/core';
import FormDialog from '../../../components/FormDialog';


interface IProps{
    todo : ITodoList;
}

export const DeletedTodo : React.FC<IProps> = ({todo}: IProps) => {

    const[open, setOpen] = useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveTodo = ( todo : ITodoList) => {
        console.log("удален ",todo)
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    
    return(
        <div>
            <Button size = "small" color = "secondary" onClick = {() => handleOpen()}>
                Удалить список
            </Button>
            <FormDialog 
                removeElement = {todo}
                isOpen = {open}
                isTask = {false}
                dialogTitle = 'Удалить список?'
                dialogContextText = "Вы действительно хотите удалить список?"
                handleRemoveTodo = {handleRemoveTodo}
                handeleClose = {handleClose}
            />
        </div> 
    );
}


export default DeletedTodo;