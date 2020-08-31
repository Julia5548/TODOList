import { watchCreateTask } from '../User';
import {addTaskAction, workCreateTask, getCookie} from '../User'
import { ITodo } from '../../interface';
import { call, takeEvery } from 'redux-saga/effects';


describe('create_task', () =>{

    const newTask : ITodo = {
        id: null, 
        user:1, 
        name:'покормить кота', 
        completed : false
    }
    
    it('should create an action to add a todo', () => {

        const expectedAction = {
            type : 'CREATE_TASK',
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
        
        const fake_action = {newTask};
        const generator = workCreateTask(fake_action);

        const fetch_create_task = async (newTask : ITodo) =>{

            const csrftoken = getCookie('csrftoken');
            const url = 'http://127.0.0.1:8000/api/task_create/'
    
            fetch(url, {
                mode : 'cors',
                method: 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken!,
                    Authorization : 'JWT ' + localStorage.getItem('token')
                },
                body : JSON.stringify(newTask)
            }).catch(function(error){
                console.log('ERROR:' , error)
            })
        }
        
        expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(call(() => {fetch_create_task})))
    })
})