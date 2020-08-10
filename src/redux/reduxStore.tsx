import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as modal } from 'redux-modal';

const reducer = combineReducers({ 
    form: formReducer,
    modal
})
const store = createStore(reducer)
export default store