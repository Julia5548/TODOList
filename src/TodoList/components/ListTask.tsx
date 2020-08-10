import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Typography, Card, CardContent, IconButton, Checkbox} from '@material-ui/core'
import { ITodo } from '../../interface';
import FormDialog from '../components/FormDialog'



const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        padding : theme.spacing(0,3,0,3),
        margin : theme.spacing(5),
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      notCheck :{
        flex: '1 0 auto',
      },
      check: {
        flex: '1 0 auto',
        textDecoration : 'line-through',
        background: 'rgba(0, 0, 0, 0.12)',
        color: 'white',
        boxShadow: 'none',
      },
}))

type TodoListProps = {
    todoList : ITodo[];
    onToggle(id : number) : void;
    onRemove(id : number) : void;
}
const ListTask : React.FC<TodoListProps>= ({todoList, onToggle, onRemove}) => {

    const classes = useStyles()
    const[open, setOpen] = useState(false)

    if(todoList.length === 0){
        return (
            <Typography variant = "h5" component = "h5" align = 'center'>
                Задач нет!
            </Typography>
        )
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleRemoveTask = (id:number) => {
        onRemove(id)
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return(
        <div>
            {todoList.map(todo => {
                let classCheked = classes.notCheck
                if(todo.completed){
                    classCheked = classes.check
                }
                return(
                    <Card key = {todo.id}  className = {classes.root}>
                        <Checkbox
                            checked = {todo.completed}
                            onChange = {() => {onToggle(todo.id)}}/>
                        <CardContent className = {classCheked}>
                            <Typography variant = "h5" component = "h5">
                                {todo.title}
                            </Typography>
                        </CardContent>
                        <IconButton aria-label = "delete" color="secondary" edge="end" onClick = {handleOpen}>
                            <DeleteIcon fontSize = "small"/>
                        </IconButton>
                        <FormDialog idTask = {todo.id} handlerRemove = {handleRemoveTask} show = {open} handleDestroy = {handleClose} handleHide = {handleClose} />
                    </Card>
                    )
                }
                )}
        </div>
    )
}

export default ListTask