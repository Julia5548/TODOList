import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store, { history } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Root from './pages/Root';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history = {history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
