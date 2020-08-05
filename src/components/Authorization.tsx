import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

interface IProps{
    firstName : string;
    lastName : string;
    email : string;
}

export const Authorization : React.FC<IProps & InjectedFormProps<{}, IProps>> = (props : any) => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email" />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

const form = reduxForm<{}, IProps>({
  form: 'auth',
})(Authorization);

export default form;