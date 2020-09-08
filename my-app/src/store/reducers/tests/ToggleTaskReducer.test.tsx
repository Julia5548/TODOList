import { call, takeEvery } from 'redux-saga/effects';
import { ITask } from '../../../interfaces/ITask';
import { TOGGLE_TASK } from '../../actions/types';
import { toggleTaskAction } from '../../actions';
import { watchToggleTask, workToggleTask } from '../../saga/sagaTask';
import { fetch_create_task } from '../../../services/services_task';


describe('toggle_task', () =>{

    const task : ITask = {
        id: 1, 
        id_todo:1, 
        title:'покормить кота', 
        is_completed : false
    }
    
    it('should create an action to toggle a todo', () => {

        const expectedAction = {
            type : TOGGLE_TASK,
            task
        }

        expect(toggleTaskAction(task)).toEqual(expectedAction)
    })

    it('should wait for every TOGGLE_TASK action and call workToggleTask', () => {
        const generator = watchToggleTask()
        expect(generator.next().value).toEqual(takeEvery('TOGGLE_TASK', workToggleTask))
        expect(generator.next().done).toBeTruthy()
    })

    it('Fetches the task successfully', async () => {
        task.is_completed = !task.is_completed
        const fake_action = {task};
        const generator = workToggleTask(fake_action);

        expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(call(() => {fetch_create_task})))
    })
})