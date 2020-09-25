import { TextField } from "@material-ui/core";
import React from "react";


export const RenderTextField = 
({  input, 
    label,
    meta: { touched, error, invalid }, 
    ...custom 
}) => (
    <TextField
        fullWidth
        label = {label}
        margin = 'normal'
        name={label}
        error={touched && invalid}
        helperText={touched && error}
        required
        variant = 'standard'
        {...input}
        {...custom}
    />
)