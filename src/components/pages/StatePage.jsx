import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Container from '@mui/material/Container';

const sections = [
    { title: 'Hospitals', url: '/hospitals' },
    { title: 'States', url: '/states' },
    { title: 'Networks', url: '/networks' },
    { title: 'Procedures', url: '/procedures' },
    { title: 'About Us', url: '/about' }
  ];

const title = 'Translucent Health';
const description = 'This is the footer';

const StatePage = () => {
    return (
        <>
            <Header sections={sections} title={title} />
            <React.Fragment>
                <Container >
                    <p>This is the State page!</p>
                </Container>
            </React.Fragment>
            <Footer description={description} title={title} />
        </>
    )
}

export default StatePage;