import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function CardDashboard(props) {

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography color={props.color} gutterBottom>
          {props.titulo}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color={props.color} variant="h5" component="div">
          {props.quantidade}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={props.link}>
          <Button color={props.btnColor} size="small" variant="contained">Ir para {props.nome}</Button>
        </Link>
      </CardActions>
    </React.Fragment >
  );
  return (
    <Box sx={{ maxWidth: 275, borderRadius: '50px' }}>
      <Card sx={{ bgcolor: props.cardColor }} variant="elevation" >{card}</Card>
    </Box>
  );
}
