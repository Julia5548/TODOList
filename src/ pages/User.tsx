import React from 'react';
import { connect } from 'react-redux';
import  WindowTask  from '../components/MainWindowTodo';

export const User = (props: any) => {

    const handleSubmit = (values: any) => {
        window.alert(JSON.stringify(values));
    }

    return (
        <WindowTask onSubmit={handleSubmit} {...props} />
    );
}

export default connect(null)(User);