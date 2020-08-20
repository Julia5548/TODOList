import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
}))

export const Password_Reset_Done : React.FC = () => {
    const classes = useStyles()
    return(
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    На вашу электронную почту пришло сообщение!
                </Typography>
                
            </div>
    )
}

export default Password_Reset_Done;