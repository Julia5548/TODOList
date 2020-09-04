import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { /*connectModal,*/ InjectedProps  } from 'redux-modal';
import { ITodoList } from '../../interfaces/ITodoList';

interface Props extends InjectedProps {
    todo : ITodoList;
    handlerRemove(task : ITodoList) : void;
}

// const FormDialog = ({todo, handlerRemove, show, handleHide }: Props) => {

//             return(
//                 <Dialog open = {show} aria-labelledby = "form-dialog-title">
//                     <DialogTitle id = "form-dialog-title">
//                         Удалить задачу?
//                     </DialogTitle>
//                     <DialogContent>
//                         <DialogContentText>
//                             Вы действительно хотите удалить текущую задачу?
//                         </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button  color = "primary" onClick = {handleHide}>
//                             Отмена
//                         </Button>
//                         <Button color = "primary" onClick  = {() => handlerRemove(todo)}>
//                             Удалить
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             )
// }
// // const modal  =  connectModal({
// //     name : 'deleteRequest'
// // })(FormDialog)

// export default FormDialog
