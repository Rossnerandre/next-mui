import { Box, Grid, Paper } from "@mui/material";
import CardDashboard from "../../components/CardDashboard";
import { styled, useTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import getEmpresas from '../../services/getEmpresas';
import getGrupos from '../../services/getGrupos';
import { useEffect, useState } from "react";

export default function Dashboard() {
  let empresasService = getEmpresas();
  const [empresas, setEmpresas] = useState();

  let gruposService = getGrupos();
  const [grupos, setGrupos] = useState();

  useEffect(() => {
    if (empresasService) {
      setEmpresas(empresasService);
    }
    if (gruposService) {
      setGrupos(gruposService);
    }
  })


  const theme = useTheme();

  if (!empresas || !grupos) {
    return <p>Loading...</p>
  }
  // if (!grupos) {
  //   return <p>Loading...</p>
  // }


  return (<ThemeProvider theme={theme}>
    <Box>
      <h1>Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={5} md={4} lg={3} xl={2} >
            <CardDashboard
              titulo={'Grupos cadastrados'}
              quantidade={grupos.length}
              nome={'Empresas'}
              cardColor={'warning.light'}
              color={'text.dark'}
              btnColor={'secondary'}
              link={'/dashboard/grupos'}
            />
          </Grid>
          <Grid item sm={5} md={4} lg={3} xl={2}>
            <CardDashboard
              titulo={'Empresas cadastradas'}
              quantidade={empresas.length}
              naoseiainda={'Alguma info'}
              nome={'Empresas'}
              cardColor={'info.dark'}
              color={'text.dark'}
              btnColor={'info'}
              link={'/dashboard/empresas'}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  </ThemeProvider>
  )
}
