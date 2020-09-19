import { all, takeEvery } from 'redux-saga/effects';
import { CREATE_TASK, CREATE_TODO, CREATE_USER, GET_TASK, GET_TODO, GET_USER, LOGIN_USER, REMOVE_TASK, REMOVE_TODO, RESET_PASSWORD, SEND_EMAIL, TOGGLE_TASK } from '../actions/types';
import { workCreateTask, workGetTask, workRemoveTask, workToggleTask } from './sagaTask';
import { workCreateTodo, workGetTodo, workRemoveTodo } from './sagaTodo';
import { workerCreateUser, workerLoginUser, workerResetPassword, workerSendEmail, workGetUser } from './sagaUser';


export function* rootSaga(){
    yield all ([
        yield takeEvery(CREATE_TASK, workCreateTask),
        yield takeEvery(TOGGLE_TASK, workToggleTask),
        yield takeEvery(REMOVE_TASK, workRemoveTask),
        yield takeEvery(GET_TASK, workGetTask),
        yield takeEvery(GET_TODO, workGetTodo),
        yield takeEvery(CREATE_TODO, workCreateTodo),
        yield takeEvery(REMOVE_TODO, workRemoveTodo),
        yield takeEvery(GET_USER, workGetUser),
        yield takeEvery(LOGIN_USER, workerLoginUser),
        yield takeEvery(CREATE_USER, workerCreateUser),
        yield takeEvery(RESET_PASSWORD, workerResetPassword),
        yield takeEvery(SEND_EMAIL, workerSendEmail)
    ]);
}