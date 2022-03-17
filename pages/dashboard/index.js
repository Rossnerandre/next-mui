import { Box, Grid, Paper } from "@mui/material";
import CardDashboard from "../../components/CardDashboard";
import { styled, useTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";

export default function Dashboard() {
  const theme = useTheme();

  return (<ThemeProvider theme={theme}>
    <Box>
      <h1>Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={5} md={4} lg={3} xl={2} >
            <CardDashboard
              titulo={'Grupos cadastrados'}
              quantidade={'32'}
              nome={'Empresas'}
              cardColor={'info.main'}
              color={'text.white'}
              btnColor={'primary'}
            />
          </Grid>
          <Grid item sm={5} md={4} lg={3} xl={2}>
            <CardDashboard
              titulo={'Empresas cadastradas'}
              quantidade={'32'}
              naoseiainda={'Alguma info'}
              nome={'Empresas'}
              cardColor={'info.light'}
              color={'text.dark'}
              btnColor={'success'}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  </ThemeProvider>
  )
}
