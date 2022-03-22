import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Button, makeStyles } from '@mui/material'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import styled from '@emotion/styled';
import Controls from './controls/Controls';


const MyDialog = styled(Dialog)(({ theme }) => ({
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
}));

const MyDialogTitle = styled(DialogTitle)(({ theme }) => ({
    textAlign: 'center'
}));

const MyTitleIcon = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#efabab',
    color: theme.palette.error.main,
    '&:hover': {
        backgroundColor: '#efabab',
        cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
        fontSize: '8rem',
    }
}));


export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;


    return (
        <MyDialog open={confirmDialog.isOpen}>
            <MyDialogTitle  >
                <MyTitleIcon disableRipple>
                    <NotListedLocationIcon />
                </MyTitleIcon>
            </MyDialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }} >
                <Controls.Button
                    text="Não"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
                    text="Sim"
                    color="secondary"
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </MyDialog>
    )
}
