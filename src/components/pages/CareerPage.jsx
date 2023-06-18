import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Container, Grid, Typography, Paper } from '@mui/material';

const CareerPage = () => {
    return (
    <>
        <Header />
        <React.Fragment>
        <Container maxWidth="md" padding="lg" sx={{mt:7, mb:15}}>
                     <Container maxWidth="sm" padding="lg">
                         <Typography variant="h5" align="center" color="textPrimary">
                             If you know how to make a career with this application, please let us know!
                        </Typography>
                        </Container>
                 </Container>
        </React.Fragment>
        <Footer />
    </>
    );
};

export default CareerPage;