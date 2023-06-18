import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import client from '../../api/client'
import Box from '@mui/material/Box';
import Map from '../map/Map';

const AboutPage = () => {
    const location = useLocation();
    const hospitalSearched = new URLSearchParams(location.search).get('h');
    const [hospital, setHospital] = useState(false);

    // const apiKey = process.env.MAPS_API_KEY ? process.env.MAPS_API_KEY : 'configure website maps api here'
    const getHospital = async () => {
        try {
          let response = await client.get('getHospitals.json');
          setHospital(response.data.find((hospital) => hospital['name'] == hospitalSearched));
        } catch (e) {
          console.log(e);
        }
      };
      useEffect(() => {
        getHospital();
      }, []);
    return (
        <>
            <Header />
            <React.Fragment>
            {hospital ?
                <Container maxWidth="md" padding="lg" sx={{mt:7}}>
                    <Container maxWidth="sm" padding="lg">
                        <Typography variant="h3" align="center" color="textPrimary">
                            {hospital['name']}
                        </Typography>
                        <Typography variant="h6" align="center" color="#29335C" paragraph>
                        {hospital['street_address']} {hospital['city']}, {hospital['state']} {hospital['zip_code']}
                        </Typography>
                    </Container>
                    <Map props={hospital}/>
                </Container>
                : <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>} 
            </React.Fragment>
            <Footer />
        </>
    )
}

export default AboutPage;