import React from 'react'
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

export default function MySwitch(props) {

    const { label, name, checked, error = null, onChange } = props;

    return (
        <FormControlLabel control={
            <Switch
                checked={checked}
                name={name}
                onChange={onChange}
                {...(error && { error: true, helperText: error })}
            />} label={label}
        />



    )
}
