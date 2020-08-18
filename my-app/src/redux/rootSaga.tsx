import { all } from 'redux-saga/effects'
import { watchCreateTask, watchRemoveTask, watchToggleTask } from '../ pages/User';


export function* rootSaga(){
    yield all ([
        watchCreateTask(),
        watchToggleTask(),
        watchRemoveTask(),
    ])
}