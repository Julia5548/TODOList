import React from 'react';
import { Checkbox, makeStyles } from '@material-ui/core';
import { ITask } from '../../../interfaces/ITask';
import { toggleTaskAction } from '../../../store/actions';
import { connect } from 'react-redux';


interface IProps {
    toggleTask : ITask;
    onToggle(task : ITask) : void;
}

const useStyles = makeStyles((theme) => ({

    checkBox: {
        marginTop : theme.spacing(1.5),
      },
}));

const mapDispatchToProps = (dispatch) => {
    return({
        onToggle : (task : ITask) => {
            dispatch(toggleTaskAction(task))
        },
    })
}

export const ToggleTask : React.FC<IProps> = ({toggleTask, onToggle} : IProps) => {

    const classes = useStyles()
    const onToggleTask = (task : ITask) =>{
        task.isCompleted = !task.isCompleted;
        onToggle(task)
    };
    return(
        <div>
           <Checkbox
                checked = {toggleTask.isCompleted}
                name = 'checkBox_toggle_task'
                className = {classes.checkBox}
                onChange = {() => onToggleTask(toggleTask)}
            />            
        </div>
    );
}

export default connect(null, mapDispatchToProps)(ToggleTask);