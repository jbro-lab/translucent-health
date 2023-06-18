import React from "react";
import { useEffect, useState } from 'react';
import HospitalsReturned from '../hospital/HospitalListItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import client from '../../api/client'

const HospitalList = (props) => {
  const [hospitals, setHospitals] = useState(false);
  const getHospitals = async () => {
    try {
      let response = await client.get('/api/v1/hospitals');
      // console.log(response)
      setHospitals(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{justifyContent: 'center', alignItems: 'center'}}>
        {hospitals ? hospitals.map((hospital) => (
          <HospitalsReturned key={hospital['id']} hospital={hospital} />
        )): <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
      }
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default HospitalList;