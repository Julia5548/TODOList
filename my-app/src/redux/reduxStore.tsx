import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from '../redux/rootSaga'
import { watchCreateTask } from '../ pages/User'

const reducer = combineReducers({ 
    form: formReducer,
    modal
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
export default store