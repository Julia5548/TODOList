import { reducer as formReducer } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import { combineReducers } from 'redux';
import { user_reducer } from './reducer_user';


export const reducer = combineReducers({ 
    user_data : user_reducer,
    form: formReducer,
    modal
})

export type RootState  = ReturnType<typeof reducer>