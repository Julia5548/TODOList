import { fork, all } from 'redux-saga/effects'
import { watchCreateTask, watchUpdateTask } from '../ pages/User'
import { combineReducers } from 'redux'


export function* rootSaga(){
    yield all ([
        watchCreateTask(),
        watchUpdateTask(),
    ])
}