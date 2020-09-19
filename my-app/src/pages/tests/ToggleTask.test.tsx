import React from 'react'
import { ITask } from '../../interfaces/ITask';
import { createStore, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ToggleTask from '../todo-list/toggle-task'
import Checkbox from '@material-ui/core/Checkbox';


describe('<ToggleTask />', () => {
    let wrapper: any;

    const todoList: ITask = 
        {
            id: 1, 
            id_todo:1, 
            title:'покормить кота', 
            is_completed : false
        };

    it('changes as checkbox is checked/unchecked', () =>{
        const store = createStore(combineReducers({form : formReducer}));
        
        wrapper = mount(
            <Provider store= {store}>
                <ToggleTask toggleTask = {todoList}/>
            </Provider>
        );
        
        const checkboxTask = wrapper.find(Checkbox);

        expect(checkboxTask.prop('name')).toBe('checkBox_toggle_task');
        expect(checkboxTask.prop('checked')).toBe(todoList.is_completed);
    });
});