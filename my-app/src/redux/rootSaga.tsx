import { all } from 'redux-saga/effects'
import { watchCreateTask, watchRemoveTask, watchToggleTask, watch_login_user, watch_create_user, watch_reset_password } from '../ pages/User';


export function* rootSaga(){
    yield all ([
        watchCreateTask(),
        watchToggleTask(),
        watchRemoveTask(),
        watch_create_user(),
        watch_login_user(),
        watch_reset_password()
    ])
}