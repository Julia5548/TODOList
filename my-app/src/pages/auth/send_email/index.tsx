import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { onSendEmailAction } from '../../../store/actions';
import Form from './components/formEmail';

interface IProps{
    onSendEmail : (values: Record<string, any>) => void;
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
        onSendEmail :(values: Record<string, any>) => {
            dispatch(onSendEmailAction(values))
        }
    }
)

export const SendEmail : React.FC<IProps> = ({onSendEmail} : IProps) => {
    
    const classes = useStyles();

    return(
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Сброс пароля
            </Typography>
            <Form onSubmit = {onSendEmail}/>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(SendEmail);