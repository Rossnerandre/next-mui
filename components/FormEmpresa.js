import React from 'react'
import { Box } from '@mui/material';
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import axios from 'axios';
import { minWidth } from '@mui/system';
import getGrupos from '../services/getGrupos';


const initialFValues = {
  grupoId: '',
  nome: '',
  email: '',
  cnpj: '',
  status: true,
}

export default function FormGrup(props) {
  let gruposService = getGrupos()

  const [grupos, setGrupos] = React.useState();

  React.useEffect(() => {
    if (gruposService) {
      setGrupos(gruposService);
    }
  })


  const { handleAddEmpresa } = props

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('grupoId' in fieldValues)
      temp.grupoId = fieldValues.grupoId ? "" : "Campo obrigatório."
    if ('nome' in fieldValues)
      temp.nome = fieldValues.nome ? "" : "Campo obrigatório."
    if ('email' in fieldValues)
      temp.email = fieldValues.email ? "" : "Campo obrigatório."
    if ('cnpj' in fieldValues)
      temp.cnpj = fieldValues.cnpj ? "" : "Campo obrigatório."
    if ('status' in fieldValues)
      temp.status = fieldValues.status ? "" : "Campo obrigatório."
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
        await axios.post('http://cartoes-back.test/api/empresas', {
          grupo_id: values.grupoId,
          nome: values.nome,
          email: values.email,
          cnpj: values.cnpj,
          ativa: values.status,
        });
        handleAddEmpresa(values, resetForm)
      } catch (e) {
        console.log(e.response)
        if (e.response.data.errors.nome) {
          setErrors({ nome: e.response.data.errors.nome });
        }
        if (e.response.data.errors.email) {
          setErrors({ email: e.response.data.errors.email });
        }
        if (e.response.data.errors.cnpj) {
          setErrors({ cnpj: e.response.data.errors.cnpj });
        }
      }
    }
  }

  if (!grupos) {
    return <p>Loading...</p>
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Box mb={3} >
        <Controls.Select
          name="grupoId"
          label="Grupo"
          value={values.grupoId}
          onChange={handleInputChange}
          options={grupos}
          error={errors.grupoId}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box mb={3}>
        <Controls.Input
          label="Nome"
          name="nome"
          value={values.nome}
          onChange={handleInputChange}
          error={errors.nome}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box mb={3}>
        <Controls.Input
          label="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
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
      <Box mb={3}>
        <Controls.Switch
          label="Status"
          name="status"
          checked={values.status}
          onChange={handleInputChange}
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

    </Form >
  )
}
