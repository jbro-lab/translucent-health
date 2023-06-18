import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function CashPriceCard(props) {
  const { cashPrice, hospital, width } = props;
  return (
    <Grid container justifyContent="center">
    <Grid item xs sx={{ md:6, mt:5, mx: 'auto', flexGrow: 1, flexShrink: 1 }}>
      <Card sx={{ mx: "auto", display: 'flex' }}>
      <CardContent sx={{ minWidth: "fit-content", flex: 1, overflow: 'auto' }}>
          <Typography component="h2" variant="h5" color="text.secondary" sx={{ flex: 1, overflow: 'auto' }}>
          {/* {hospital.name} Cash Price */}
          {hospital.name} Reported Cash Price
          </Typography>
          <Typography component="h2" variant="h4" color="text.primary" sx={{ flex: 1, overflow: 'auto' }}>
          ${cashPrice ? cashPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null}
          </Typography>
          <Typography variant='caption' sx={{ fontStyle: 'italic' }}>
              Prices provided by hospital
          </Typography>
      </CardContent>
      </Card>
    </Grid>
    </Grid>
  );
}

export default CashPriceCard;