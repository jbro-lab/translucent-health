import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

function ReturnedHospitals(props) {
  const { hospital } = props;

  return (
    <Grid container justifyContent="center">
    <Grid item xs={12} md={8} sx={{mx: "auto"}}>
        <CardActionArea component="a" href="#">
            <Card sx={{ ml: 1, display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                {/* {hospital.title} */}
                {hospital['name']}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                {hospital['street_address']} {hospital['city']}, {hospital['state']} {hospital['zip_code']}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                {hospital['owner_name'] ? `${hospital['owner_name']}`: ''}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                More Info
                </Typography>
            </CardContent>
            </Card>
        </CardActionArea>
    </Grid>
    </Grid>
  );
};

export default ReturnedHospitals;