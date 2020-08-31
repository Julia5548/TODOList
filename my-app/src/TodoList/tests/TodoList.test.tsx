import React from 'react'
import {WindowTask} from '../pages/TodoList'
import ReduxFormWindowTask from '../pages/TodoList'
import {reducer as formReducer} from 'redux-form'
import {shallow, mount, ShallowWrapper} from 'enzyme'
import { Field } from 'redux-form';
import { Button } from '@material-ui/core';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

describe('<WindowTask />', () => {
    let wrapper: any;

    const props:any = {
        handleSubmit : jest.fn(),
    }

    it('checks if initial state is equal to 0', () => {
        wrapper = shallow(
            <WindowTask {...props}  match = {{params : {pk : '1'}}}/>
        );

        const taskField = wrapper.find(Field);
        // console.log(toJson(taskField))
        expect(taskField.prop('name')).toBe('task');
        expect(taskField.prop('label')).toBe('string');
    });

    it('button create', () => {
        const create_button = wrapper.find(Button).find({name : 'create_task'});
    
        expect(create_button.prop('type')).toEqual('submit');
        expect(create_button.prop('children')).toEqual('Создать');
        // console.log(toJson(create_button))
    });
})

describe('Redux-Form WindowTask', () =>{
    let store : any;
    let wrapper : any;

    const props:any = {
        handleSubmit : jest.fn(),
    }

    it('displayed correctly',() => {
        store = createStore(combineReducers({form : formReducer}))
        wrapper = mount(
            <Provider store= {store}>
                <MemoryRouter initialEntries= {['todo/1']}>
                    <ReduxFormWindowTask {...props} match = {{params : {pk : '1'}}}/>
                </MemoryRouter>
            </Provider>
        )
        expect(wrapper).toMatchSnapshot()
    })
})