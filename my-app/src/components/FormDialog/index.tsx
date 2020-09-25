import React  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ITodoList } from '../../interfaces/ITodoList';
import { ITask } from '../../interfaces/ITask';


interface Props  {
    removeElement : ITodoList | ITask;
    dialogContextText : string;
    dialogTitle : string;
    isTask : boolean;
    isOpen : boolean;
    onCloseDialog : (result : boolean) => void;
    onRemoveTask? : (task : ITask) => void;
    onRemoveTodo? : (todo : ITodoList) => void;
}

const FormDialog  = ({removeElement, isOpen ,dialogContextText, dialogTitle, isTask, onCloseDialog,  onRemoveTask, onRemoveTodo}: Props) =>{
    
    const handleCloseDialog = () =>{
        onCloseDialog(false);
    };
    const handleRemoveTodo = () => {
        onRemoveTodo!(removeElement as ITodoList);
    };
    const handleRemoveTask = () => {
        onRemoveTask!(removeElement as ITask);
    };
    return(
        <Dialog open = {isOpen} aria-labelledby = "form-dialog-title">
            <DialogTitle id = "form-dialog-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogContextText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button  color = "primary"  onClick = {handleCloseDialog}>
                    Отмена
                </Button>
                <Button color = "primary" onClick = {isTask ? handleRemoveTask : handleRemoveTodo}>
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormDialog;

