import { all } from 'redux-saga/effects';
import { watch_create_task, watch_remove_task, watch_toggle_task } from '../saga/sagaTask';
import { watch_login_user, watch_create_user, watch_reset_password } from '../saga/sagaUser';


export function* rootSaga(){
    yield all ([
        watch_create_task(),
        watch_toggle_task(),
        watch_remove_task(),
        watch_create_user(),
        watch_login_user(),
        watch_reset_password()
    ])
}