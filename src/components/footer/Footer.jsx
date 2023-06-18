import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FooterButton from './FooterButton';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://translucenthealth.net">
        TranslucentHealth.net
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <Box component="footer" sx={{ mt: 3, width: '100%', }}>
      <Container maxWidth="lg" sx={{ mt: 3, mb:1 }}>
        <Grid container spacing={4} justifyContent='space-between'>
        {isSmallScreen ? <>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{fontWeight: 'bold', justifyContent: 'center'}}>
              Translucent Health
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
                <FooterButton text="Home" href="/" sx={{ textAlign: 'left', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
              <FooterButton text="About" href="/about" sx={{ textAlign: 'left', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
              <FooterButton text="Search" href="/search" sx={{ textAlign: 'left', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
                <FooterButton text="CMS.gov" href="https://www.cms.gov/" sx={{ textAlign: 'left', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
              <FooterButton text="Careers" href="/careers" sx={{textAlign: 'left', paddingLeft: 0 }} hidden/>
            </Typography>
            </Grid>
            </>
            : <>
            <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{fontWeight: 'bold', justifyContent: 'center'}}>
              Get Started
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
                <FooterButton text="Home" href="/" sx={{ textAlign: 'left', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
              <FooterButton text="About" href="/about" sx={{ textAlign: 'left', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'left'}}>
              <FooterButton text="Search" href="/search" sx={{ textAlign: 'left', paddingLeft: 0 }}/>
            </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{fontWeight: 'bold', textAlign: 'center' }}>
              Resources
            </Typography>
            <Typography sx={{textAlign: 'center'}}>
                <FooterButton text="CMS.gov" href="https://www.cms.gov/" sx={{ textAlign: 'center', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'center'}}>
                <FooterButton text="Health.gov" href="https://health.gov" sx={{ textAlign: 'center', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'center'}}>
                <FooterButton text="HHS.gov" href="https://www.hhs.gov" sx={{ textAlign: 'center', paddingLeft: 0 }}/>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{fontWeight: 'bold', textAlign: 'end'}}>
              Translucent Health
            </Typography>
            <Typography sx={{textAlign: 'right'}}>
              <FooterButton text="About" href="/about" sx={{ textAlign: 'right', paddingLeft: 0 }}/>
            </Typography>
            <Typography sx={{textAlign: 'right'}}>
              <FooterButton text="Careers" href="/careers" sx={{textAlign: 'right', paddingLeft: 0 }} hidden/>
            </Typography>
          </Grid>
          </>}
        </Grid>
      </Container>
      <Container sx={{width: '100%', mb: 2, mt:0,  }}>
          <Typography variant="h6" align="center" color='black'>
            Translucent Health
          </Typography>
          <Copyright />
        </Container>
        </Box>
    </>
  );
}

export default Footer;