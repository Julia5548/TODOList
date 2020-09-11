import { call, takeEvery } from 'redux-saga/effects';
import { ITask } from '../../interfaces/ITask';
import { CREATE_TASK } from '../actions/types';
import { addTaskAction } from '../actions';
import { watchCreateTask, workCreateTask } from '../saga/sagaTask';
import { fetch_create_task } from '../../services/services_task';


describe('create_task', () =>{

    const newTask : ITask = {
        id: null, 
        id_todo:1, 
        title:'покормить кота', 
        is_completed : false
    }
    
    it('should create an action to add a todo', () => {

        const expectedAction = {
            type : CREATE_TASK,
            newTask
        }

        expect(addTaskAction(newTask)).toEqual(expectedAction)
    })

    it('should wait for every CREATE_TASK action and call workCreateTask', () => {
        const generator = watchCreateTask()
        expect(generator.next().value).toEqual(takeEvery('CREATE_TASK', workCreateTask))
        expect(generator.next().done).toBeTruthy()
    })


    it('Fetches the task successfully', async () => {
        
        const action = {newTask};
        const generator = workCreateTask(action);
        
        expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(call(fetch_create_task, newTask)))
    })
})