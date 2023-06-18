import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import CardMedia from '@mui/material/CardMedia';

function ReturnedHospitals(props) {
  const { hospital } = props;

  const handleHospitalClick = () => {
    const h = hospital['name']
    const hospitalSearchParams = new URLSearchParams({ h });
    const url = `hospital?${hospitalSearchParams.toString()}`;
    window.location.href = url;
  };

  return (
    <Grid item xs={12} md={6} mt={5}>
      <Card sx={{ display: 'flex' }}>
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
          <Button variant="text" onClick={handleHospitalClick} sx={{ paddingLeft: 0 }}>
            <Typography variant="h6" color="primary" sx={{ textTransform: 'none' }}>
              More Info
            </Typography>
            </Button>
      </CardContent>
      {/* <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          // image={hospital.image}
          image="https://source.unsplash.com/random"
          // alt={hospital.imageLabel}
      /> */}
      </Card>
    </Grid>
  );
}

// ReturnedHospitals.propTypes = {
//   hospital: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageLabel: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default ReturnedHospitals;