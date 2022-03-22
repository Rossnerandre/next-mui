import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@mui/material";

export default function DatePicker(props) {

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}

            />
        </MuiPickersUtilsProvider>
    )
}
