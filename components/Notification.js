import React from 'react'
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

// const useStyles = makeStyles(theme => ({
//     root: {
//         top: theme.spacing(9)
//     }
// }))

export default function Notification(props) {

    const { notify, setNotify } = props;
    // const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
