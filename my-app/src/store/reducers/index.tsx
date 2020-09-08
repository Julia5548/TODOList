import { reducer as formReducer } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import { combineReducers } from 'redux';
import { user_reducer } from './reducer_user';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { task_reducer } from './reducerTask';
import { todoList_reducer } from './reducers-todo';

const history = createBrowserHistory()

export const reducer = combineReducers({ 
    user_data : user_reducer,
    taskData : task_reducer,
    todoListData : todoList_reducer, 
    router : connectRouter(history),
    form: formReducer,
    modal
})

export type RootState  = ReturnType<typeof reducer>