import { reducer as formReducer } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import { combineReducers } from 'redux';
import { user_reducer } from './reducer_user';
import { connectRouter } from 'connected-react-router';
import { task_reducer } from './reducerTask';
import { todoList_reducer } from './reducers-todo';
import { INITIAL_USER } from '../actions/types';


const reducer = (history) => combineReducers({ 
    user_data : user_reducer,
    taskData : task_reducer,
    todoListData : todoList_reducer, 
    router : connectRouter(history),
    form: formReducer,
    modal
})

export const rootReducer = (history) => (state, action) => {
    if (action.type === INITIAL_USER) {
      state = undefined
    }
  
    return reducer(history)(state, action)
  }