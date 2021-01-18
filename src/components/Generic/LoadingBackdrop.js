import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
function LoadingBackdrop({open}) {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingBackdrop
