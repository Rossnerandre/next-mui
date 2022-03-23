import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { TableSortLabel, TextField, Typography, TableHead } from '@mui/material';
import getGrupos from '../../../services/getGrupos';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { mutate } from 'swr';
import ConfirmDialog from '../../../components/ConfirmDialog';
import Notification from '../../../components/Notification';
import Controls from '../../../components/controls/Controls';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../../../components/Popup';
import FormGrupo from '../../../components/FormGrupo';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const sortId = (dados, ascending) => {
  return dados.sort((dadoA, dadoB) => {
    if (ascending) {
      return dadoA.id > dadoB.id ? 1 : -1;
    } else {
      return dadoA.id < dadoB.id ? 1 : -1;
    }
  });
};

const searchFields = (dados, entrada) => {
  const filtered = dados.filter(
    entry => Object.values(entry).some(
      val => typeof val === "string" && val.includes(entrada.toUpperCase())
    )
  );
  return filtered;
}



export default function Grupos(props) {
  const [drawerState, setDrawerState] = React.useState({ right: false });
  const [openPopup, setOpenPopup] = React.useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortOrder, setSortOrder] = React.useState(true);
  const handleChange = () => setSortOrder(!sortOrder);
  const [enteredName, setEnteredName] = React.useState('');
  const handleName = (event) => setEnteredName(event.target.value);
  const [grupos, setGrupos] = React.useState();
  const [grupoId, setGrupoId] = React.useState();
  const [nome, setNome] = React.useState();
  const [cnpj, setCnpj] = React.useState();
  const [errorsNome, setErrorsNome] = React.useState({ erro: false });
  const [errorsCnpj, setErrorsCnpj] = React.useState({ erro: false });
  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' })
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })

  let grupoService = getGrupos();
  React.useEffect(() => {
    if (grupoService) {
      setGrupos(grupoService);
    }
  })

  if (!grupos) {
    return 'Loading...'
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - grupos.length) : 0;

  const handleChangePage = (event, newPage) => { setPage(newPage); };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (nome == '') {
      setErrorsNome({ erro: true, erroMessage: 'Nome é obrigatório' });
      return;
    }
    if (cnpj == '') {
      setErrorsCnpj({ erro: true, erroMessage: 'CNPJ é obrigatório' });
      return;
    }
    try {
      await axios.put('http://cartoes-back.test/api/grupos/' + grupoId, {
        nome: nome,
        cnpj: cnpj,
      });
      mutate('http://cartoes-back.test/api/grupos');
      setDrawerState(false)
      setNotify({
        isOpen: true,
        message: 'Update Successfully',
        severity: 'success'
      })
    } catch (e) {
      if (e.response.data.errors.nome) {
        setErrorsNome({ erro: true, erroMessage: e.response.data.errors.nome });
      }
      if (e.response.data.errors.cnpj) {
        setErrorsCnpj({ erro: true, erroMessage: e.response.data.errors.cnpj });
      }
    }
  }

  const handleUpdate = (e) => {
    setDrawerState({ right: true });
    setGrupoId(e.id);
    setNome(e.nome)
    setCnpj(e.cnpj)
  }

  async function onDelete(id) {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    try {
      await axios.delete('http://cartoes-back.test/api/grupos/' + id)
      mutate('http://cartoes-back.test/api/grupos')
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        severity: 'error'
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleAddGrupo = (values, resetForm) => {
    resetForm()
    console.log(values);
    setOpenPopup(false)
    mutate('http://cartoes-back.test/api/grupos');
    setNotify({
      isOpen: true,
      message: 'Add Successfully',
      type: 'success'
    })
  }

  const sortedDados = sortId(grupos, sortOrder);
  let Tabela = (
    <TableBody>
      {(rowsPerPage > 0
        ? sortedDados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : sortedDados
      ).map((row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell >
            {row.id}
          </StyledTableCell>
          <StyledTableCell >
            {row.nome}
          </StyledTableCell>
          <StyledTableCell >
            {row.cnpj}
          </StyledTableCell>
          <StyledTableCell align='center'>
            <Button size='small' sx={{ minWidth: '0', color: 'green', marginRight: '12px' }} onClick={() => handleUpdate(row)}><EditIcon /> </Button>
            <Button sx={{ minWidth: '0', color: 'red' }} onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation",
                onConfirm: () => { onDelete(row.id) }
              })
            }}><DeleteForeverIcon /></Button>
          </StyledTableCell>
        </StyledTableRow >
      ))}
      {emptyRows > 0 && (
        <StyledTableRow style={{ height: 53 * emptyRows }}>
          <StyledTableCell colSpan={6} />
        </StyledTableRow >
      )}
    </TableBody>
  )

  const buscaCampos = searchFields(grupos, enteredName);
  const TabelaSearchNome = (
    <TableBody>
      {(rowsPerPage > 0
        ? buscaCampos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : buscaCampos
      ).map((row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell >
            {row.id}
          </StyledTableCell>
          <StyledTableCell >
            {row.nome}
          </StyledTableCell>
          <StyledTableCell >
            {row.cnpj}
          </StyledTableCell>
          <StyledTableCell align='center' >
            <Button sx={{ color: 'green' }} onClick={() => handleUpdate(row)}><EditIcon /> </Button>
            <Button sx={{ color: 'red' }} onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation",
                onConfirm: () => { onDelete(row.id) }
              })
            }}><DeleteForeverIcon /></Button>
          </StyledTableCell>
        </StyledTableRow>
      ))}
      {emptyRows > 0 && (
        <StyledTableRow style={{ height: 53 * emptyRows }}>
          <StyledTableCell colSpan={6} />
        </StyledTableRow>
      )}
    </TableBody>
  )

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  return (
    <div>
      <Box >
        <Typography variant='h3' mb={3}>Grupos</Typography>
        <Typography variant='h5' mb={3}>Add Grupo <Button variant='contained' color={'success'} onClick={() => { setOpenPopup(true) }}><AddIcon /></Button></Typography>
      </Box>
      <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box m={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h4' >Listagem de Grupos</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Busca" variant="standard" onChange={handleName} />
          </Box>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ maxWidth: '10px' }}>
                ID
                <TableSortLabel
                  direction={sortOrder === true ? 'desc' : 'asc'}
                  onClick={handleChange}>
                </TableSortLabel>
              </StyledTableCell >
              <StyledTableCell style={{ minWidth: '170px' }}>Nome</StyledTableCell>
              <StyledTableCell style={{ minWidth: '170px' }}>CNPJ</StyledTableCell>
              <StyledTableCell align='center' pr={5}>Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          {enteredName === '' && Tabela}
          {enteredName !== '' && TabelaSearchNome}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                // colSpan={0}
                count={grupos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <React.Fragment>
        <Drawer
          anchor={'right'}
          open={drawerState['right']}
          onClose={toggleDrawer('right', false)}
        >
          <Box
            role="presentation"
            // px={3}
            mt={10}
            sx={{ minWidth: '350px', height: '100%' }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} >

              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} px={3}>
                <Typography variant='h4' textAlign={'center'} mb={5}>Atualizar grupo</Typography>
                <Box mb={5} >
                  <FormControl variant="standard" sx={{ minWidth: '100% !important' }}>
                    <TextField
                      error={errorsNome.erro}
                      id="standard-error-helper-text"
                      label="Nome"
                      value={nome}
                      onChange={(event) => { setNome(event.currentTarget.value); setErrorsNome({ erro: false, erroMessage: '' }) }}
                      helperText={errorsNome.erroMessage}
                      variant="standard"
                    />
                  </FormControl>
                </Box>
                <Box >
                  <FormControl variant="standard" sx={{ minWidth: '100% !important' }}>
                    <TextField
                      error={errorsCnpj.erro}
                      id="standard-error-helper-text"
                      label="CNPJ"
                      value={cnpj}
                      onChange={(event) => { setCnpj(event.currentTarget.value); setErrorsCnpj({ erro: false, erroMessage: '' }) }}
                      helperText={errorsCnpj.erroMessage}
                      variant="standard"
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box mb={3} >
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }} >
                  <Button size={'large'} variant={'contained'} onClick={toggleDrawer('right', false)}>Cancelar</Button>
                  <Button size={'large'} color="success" variant={'contained'} type='submit'>Atualizar</Button>
                </Box>
              </Box>
            </Box>
          </Box >
        </Drawer>
        <Popup
          title="Formulário de grupo"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <FormGrupo handleAddGrupo={handleAddGrupo} />
        </Popup>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
      </React.Fragment>
    </div>
  );
}
