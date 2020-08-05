import React from 'react';
import { connect } from 'react-redux';
import Authorization from '../components/Authorization';

export const User = (props: any) => {

    const handleSubmit = (values: any) => {
        console.log('jjjvalues', values);
    }

    return (
        <Authorization onSubmit={handleSubmit} {...props} />
    );
}

export default connect(null)(User);