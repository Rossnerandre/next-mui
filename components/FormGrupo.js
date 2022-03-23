import React, { useState, useEffect } from 'react'
import { Box, Grid, } from '@mui/material';
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import axios from 'axios';
import { minWidth } from '@mui/system';
// import * as employeeService from "../../services/employeeService";




const initialFValues = {
  grupo: '',
  cnpj: '',
}

export default function FormGrup(props) {

  const { handleAddGrupo } = props

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('grupo' in fieldValues)
      temp.grupo = fieldValues.grupo ? "" : "Campo obrigatório."
    if ('cnpj' in fieldValues)
      temp.cnpj = fieldValues.cnpj ? "" : "Campo obrigatório."
    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  async function handleSubmit(e) {
    e.preventDefault()
    if (validate()) {
      try {
        await axios.post('http://cartoes-back.test/api/grupos', {
          nome: values.grupo,
          cnpj: values.cnpj,
        });
        // mutate('http://cartoes-back.test/api/grupos');
        handleAddGrupo(values, resetForm)
      } catch (e) {
        if (e.response.data.errors.nome) {
          setErrors({ grupo: e.response.data.errors.nome });
        }
        if (e.response.data.errors.cnpj) {
          console.log(e.response.data.errors.cnpj)
          setErrors({ cnpj: e.response.data.errors.cnpj });
        }
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>


      <Box mb={3} >
        <Controls.Input
          name="grupo"
          label="Nome do grupo"
          value={values.grupo}
          onChange={handleInputChange}
          error={errors.grupo}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box mb={3}>
        <Controls.Input
          label="Cnpj"
          name="cnpj"
          value={values.cnpj}
          onChange={handleInputChange}
          error={errors.cnpj}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Box>
          <Controls.Button
            type="submit"
            color="success"
            text="Adicionar" />
        </Box>
        <Box>
          <Controls.Button
            text="Limpar"
            color="default"
            onClick={resetForm} />
        </Box>
      </Box>



      {/* <Grid item xs={6}>
          <div>
            <Controls.Button
              type="submit"
              text="Adicionar" />
            <Controls.Button
              text="Resetar campos"
              color="default"
              onClick={resetForm} />
          </div>
        </Grid> */}

    </Form >
  )
}
