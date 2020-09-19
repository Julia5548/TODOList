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
    handeleClose : (result : boolean) => void;
    handlerRemove? : (task : ITask) => void;
    handleRemoveTodo? : (todo : ITodoList) => void;
}

const FormDialog  = ({removeElement, isOpen ,dialogContextText, dialogTitle, isTask, handeleClose,  handleRemoveTodo, handlerRemove}: Props) =>(
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
                <Button  color = "primary"  onClick = {() => handeleClose(false)}>
                    Отмена
                </Button>
                <Button color = "primary" onClick = {() => {isTask ? handlerRemove!((removeElement as ITask)) : handleRemoveTodo!((removeElement as ITodoList))}}>
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
);

export default FormDialog;

