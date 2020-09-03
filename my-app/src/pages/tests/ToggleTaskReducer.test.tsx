import {toggleTaskAction, workToggleTask, watchToggleTask, getCookie} from '../User'
import { ITodo } from '../../interface';
import { call, takeEvery } from 'redux-saga/effects';


describe('toggle_task', () =>{

    const task : ITodo = {
        id: 1, 
        user:1, 
        name:'покормить кота', 
        completed : false
    }
    
    it('should create an action to toggle a todo', () => {

        const expectedAction = {
            type : 'TOGGLE_TASK',
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
        const fake_action = {task};
        const generator = workToggleTask(fake_action);

        const fetch_create_task = async () =>{

            task.completed = !task.completed
        
            const csrftoken = getCookie('csrftoken');
            const url = 'http://127.0.0.1:8000/api/task_update/' + task.id + '/'
            fetch(url, {
                mode : 'cors',
                method: 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'X-CSRFToken' : csrftoken!,
                    Authorization : 'JWT ' + localStorage.getItem('token')
                },
                body : JSON.stringify(task)
            }).catch(function(error){
                console.log('ERROR:' , error)
            })
        }

        expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(call(() => {fetch_create_task})))
    })
})