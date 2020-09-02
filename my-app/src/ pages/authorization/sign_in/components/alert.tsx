import React from "react";
import Alert from "@material-ui/lab/Alert";

interface IError{
    error_text: string;
}
const Alerts : React.FC<IError>= ({error_text} : IError) => {
    return(
        <Alert severity = "error">
            {error_text}
        </Alert>
    );
}

export default Alerts;