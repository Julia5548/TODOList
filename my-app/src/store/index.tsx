import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__COMPROSE || compose;
export const history = createBrowserHistory()

const store = createStore(rootReducer(history), composeWithDevTools(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    composeEnhancers()
));

sagaMiddleware.run(rootSaga);

export default store;