import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer } from '../reducers';
import { rootSaga } from '../saga';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__COMPROSE || compose

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    composeEnhancers()
));

sagaMiddleware.run(rootSaga)

export default store