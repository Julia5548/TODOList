import React from 'react';
import { makeStyles, Typography, Button, AppBar, Toolbar, Grid, GridList, GridListTile, ListSubheader, GridListTileBar, IconButton, Container, Card, CardMedia, CardContent, CardActions, CardHeader} from '@material-ui/core';
import FormCreateTask from './components/formCreateTask';
import { connect } from 'react-redux';
import { addTaskAction } from '../../../store/actions';
import { reset } from 'redux-form';
import { ITask } from '../../../interfaces/ITask';


interface IProps{
    onAddTask(newTask : ITask) : void;
}

const useStyles = makeStyles((theme) => ({

    root : {
        flexGrow : 1,
    },
    title : {
        flexGrow: 1,
    },
    cardGrid: {
        marginLeft : theme.spacing(3),
        width : '90%'
    },
    card: {
        display: 'flex-start',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}))

const mapDispatchToProps = (dispatch) => {
    return({
        onAddTask : (newTask : ITask) => {
            dispatch(addTaskAction(newTask))
            dispatch(reset('createTask'))
        }
    })
}

const mapStateToProps = (state) => ({})

export const DisplayTodo : React.FC<IProps> = (props : IProps) => {
    const classes = useStyles();

    const todoList = [
        {
            id: 0,
            title : 'покормить кота',
            isCompleted : false,
        },
        {
            id: 0,
            title : 'покормить кота',
            isCompleted : false,
        },
        {
            id: 0,
            title : 'покормить кота',
            isCompleted : false,
        },
        {
            id: 0,
            title : 'покормить кота',
            isCompleted : false,
        },
        {
            id: 0,
            title : 'покормить кота',
            isCompleted : false,
        }
    ]
    return(
        <div className = {classes.root}>
            <AppBar position = "static">
                <Toolbar>
                    <Typography variant="h6" className = {classes.title}>
                        username
                    </Typography>
                    <Button color="inherit">
                        Выход
                    </Button>
                </Toolbar>
            </AppBar>
            <FormCreateTask onAddTask = {props.onAddTask}/>
            <Grid container
                direction = 'row'
                justify = 'flex-start'
                alignItems = 'flex-start' 
                spacing = {1}
                className = {classes.cardGrid}
                >
                    {todoList.map((todo) => (
                        <Grid item key={todo.id} xs={6} md={3}>
                            <Card className={classes.card}>
                                <CardHeader
                                title = "1.06.2020"
                                subheader = "Ваши задачи: "
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {todo.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodo)