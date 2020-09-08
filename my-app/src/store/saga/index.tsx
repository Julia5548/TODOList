import { all } from 'redux-saga/effects';
import { watchGetTask, watchCreateTask, watchRemoveTask, watchToggleTask } from '../saga/sagaTask';
import { watch_login_user, watch_create_user, watch_reset_password } from '../saga/sagaUser';
import { watchCreateTodo, watchRemoveTodo } from './sagaTodo';


export function* rootSaga(){
    yield all ([
        watchCreateTask(),
        watchRemoveTask(),
        watchToggleTask(),
        watch_create_user(),
        watch_login_user(),
        watch_reset_password(),
        watchCreateTodo(),
        watchRemoveTodo(),
        watchGetTask()
    ]);
}