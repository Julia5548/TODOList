import React, { useCallback } from "react";
import Alert from "@material-ui/lab/Alert";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { hideErrorAction } from "../../store/actions";
import { connect } from "react-redux";

interface IError{
    error_text: string;
    onClose : () => void;
}

const mapDispatchToProps = (dispatch) => {
    return({
        onClose : () => {
            dispatch(hideErrorAction())
        }
    });
}
const Alerts : React.FC<IError>= ({error_text, onClose} : IError) => {

    const handleClose = useCallback(() => {
       onClose();
    }, [onClose]);

    return(
        <Alert severity = "error"
        action ={
            <IconButton  aria-label="close"  size="small" color="secondary" onClick={handleClose}>
                <Close fontSize="small"/>
            </IconButton>
        }>
            {error_text}
        </Alert>
    );
}

export default connect(null, mapDispatchToProps)(Alerts);