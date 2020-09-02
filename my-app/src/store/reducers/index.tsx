import { reducer as formReducer } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import { combineReducers } from 'redux';
import { user_reducer } from './reducer_user';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

const history = createBrowserHistory()

export const reducer = combineReducers({ 
    user_data : user_reducer,
    router : connectRouter(history),
    form: formReducer,
    modal
})

export type RootState  = ReturnType<typeof reducer>