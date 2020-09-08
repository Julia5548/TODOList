
import React from 'react'
import FormCreateTask from '../todo-list/create-task';
import { mount } from 'enzyme';
import { Field } from 'redux-form';
import {reducer as formReducer} from 'redux-form';
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

describe('<FormCreateTask />', () => {
    let wrapper: any;

    it('checks if initial state is equal to 0', () => {
        const store = createStore(combineReducers({form : formReducer}))
        wrapper = mount(
            <Provider store= {store}>
                <FormCreateTask idTodo = {1}/>
            </Provider>
        );

        const taskField = wrapper.find(Field);
        // console.log(toJson(taskField))
        expect(taskField.prop('name')).toBe('title');
        expect(taskField.prop('label')).toBe('Введите наименование задачи');
    });

    it('button create', () => {
        const create_button = wrapper.find(Button);
    
        expect(create_button.prop('type')).toEqual('submit');
        expect(create_button.prop('children')).toEqual('Добавить');
        // console.log(toJson(create_button))
    });
});
