import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { onSendEmailAction } from '../../../store/actions';
import Form from './components/formEmail';
import { bindActionCreators } from 'redux';
import { propTypes } from 'react-bootstrap/esm/Image';

interface IProps{
    onSendEmail : (values: Record<string, any>) => void;
    errorAuth : any;
}

const useStyles = makeStyles((theme) => ({
    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    }
}));

const mapDispatchToProps = (dispatch) => bindActionCreators(
    { 
        onSendEmail : onSendEmailAction
    }, dispatch);

const mapStateToProps = (state) => ({
    errorAuth : state.user_data.errorAuth
})
    
export const SendEmail : React.FC<IProps> = ({onSendEmail, errorAuth} : IProps) => {
    
    const classes = useStyles();
    
    return(
        <div className = {classes.page}>
            <Typography variant = 'h5' component = "h1">
                Сброс пароля
            </Typography>
            <Form onSubmit = {onSendEmail} errorAuth = {errorAuth}/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SendEmail);