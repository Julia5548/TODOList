import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../redux/rootSaga';
import {user_reducer} from '../ pages/User'


const reducer = combineReducers({ 
    user_data : user_reducer,
    form: formReducer,
    modal
})

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__COMPROSE || compose
const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    composeEnhancers()
));

sagaMiddleware.run(rootSaga)

export type RootState  = ReturnType<typeof reducer>
export default store