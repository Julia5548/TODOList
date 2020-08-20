import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

    page: {
        marginTop: theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    },
}))

export const Password_Reset_Complete : React.FC = () => {
    const classes = useStyles()
    return(
            <div className = {classes.page}>
                <Typography variant = 'h5' component = "h1">
                    Все ок!
                </Typography>
                <NavLink to="/" >
                        Авторизация
                </NavLink>
            </div>
    )
}

export default Password_Reset_Complete;