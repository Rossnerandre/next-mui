import React, { useState } from 'react'
// import { makeStyles } from '@mui/material';

export function useForm(initialFValues, validateOnChange = false, validate) {

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target
    if (name === 'status') {
      setValues({
        ...values,
        [name]: e.target.checked
      })
      return;
    };

    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange)
      validate({ [name]: value })
  }

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }
}

export function Form(props) {

  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}
