import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, makeStyles } from '@material-ui/core';
import { ITask } from '../../../interfaces/ITask';
import  FormDialog  from '../../../components/FormDialog';
import { removeTaskAction } from '../../../store/actions';
import { connect } from 'react-redux';


interface IProps {
    removeTask : ITask;
    onRemove : (task : ITask) => void;
}

const useStyles = makeStyles((theme) => ({

    deleteButton: {
        marginTop : theme.spacing(1.5),
      },
}));

const mapDispatchToProps = (dispatch) => {
    return({
        onRemove : (task : ITask) => {
            dispatch(removeTaskAction(task))
        },
    });
}

export const DeleteTask : React.FC<IProps> = ({removeTask, onRemove}: IProps) => {

    const classes = useStyles()
    const[open, setOpen] = useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveTask = ( task : ITask) => {
        onRemove(task);
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return(
        <div>
            <IconButton className = {classes.deleteButton} caria-label = "delete" color="secondary" edge="end" onClick = {() => handleOpen()}>
                <DeleteIcon fontSize = "small"/>
            </IconButton>
            <FormDialog 
                removeElement = {removeTask}
                isOpen = {open}
                isTask = {true}
                dialogTitle = 'Удалить задачу?'
                dialogContextText = "Вы действительно хотите удалить данную задачу?"
                handlerRemove = {handleRemoveTask}
                handeleClose = {handleClose}
            />
        </div>
    );
}

export default connect(null, mapDispatchToProps)(DeleteTask);