import React, { useCallback } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { onSendEmailAction } from '../../../store/actions';
import Form from './components/formEmail';

interface IProps{
    onSendEmail : (email: string) => void;
}

const useStyles = makeStyles((theme) => ({
    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    }
}));

const mapDispatchToProps = (dispatch) => (
    { 
        onSendEmail :(email: string) => {
            dispatch(onSendEmailAction(email))
        }
    }
)

export const SendEmail : React.FC<IProps> = ({onSendEmail} : IProps) => {
    
    const classes = useStyles();
    const handleSendEmail = useCallback(values =>
    {
        onSendEmail(values.email)
    }, [onSendEmail])
    return(
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Сброс пароля
            </Typography>
            <Form onSubmit = {handleSendEmail}/>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(SendEmail);