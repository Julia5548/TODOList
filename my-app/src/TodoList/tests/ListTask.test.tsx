import React from 'react'
import {ListTask} from '../components/ListTask'
import { ITodo } from '../../interface';
import { Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { shallow } from 'enzyme';


describe('<ListTask />', () => {
    let wrapper: any;

    const todoList: ITodo[] = [{id: 1, user:1, name:'покормить кота', completed : false}]
    const onRemove = jest.fn()
    const onToggle = jest.fn()

    const props : any ={
        match : {
            params:{
                pk : 1,
            }
        } 
    };

    beforeEach(() => {
        wrapper = shallow(<ListTask todoList = {todoList} onRemove = {onRemove} onToggle = {onToggle} {...props}/>)
    })

    it('changes as checkbox is checked/unchecked', () =>{
        const checkboxTask = wrapper.find(Checkbox)

        expect(checkboxTask.prop('name')).toBe('checkBox_toggle_task')
        expect(checkboxTask.prop('checked')).toBe(todoList[0].completed)
    })
    it('renders next icon button', () => {
        const nextIconButton = wrapper.find(IconButton)

        // console.log(toJson(nextIconButton))
        expect(nextIconButton.prop('aria-label')).toBe('delete')
        expect(nextIconButton.children().find(DeleteIcon))
    })
})