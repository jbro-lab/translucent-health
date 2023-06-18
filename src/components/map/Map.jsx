import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import GoogleMapsLink from './GoogleMapSearch';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import StarRanking from '../star/StarRanking';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

function Map(props) {
    const [hospital, setHospital] = useState(null);
    const [position, setPosition] = useState(null);
    const [website, setWebsite] = useState('');
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState('');
    const fallbackPosition = [35.1592, 98.4423];

    useEffect(() => {
        // Fix Leaflet marker icon path issue
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon,
            iconUrl: markerIcon,
            shadowUrl: markerIconShadow,
        });
        setHospital(props);
    }, [props]);

    useEffect(() => {
        if (hospital) {
            const lat = hospital.props.gps_latitude;
            const lng = hospital.props.gps_longitude;
            setPosition(lat && lng ? [lat, lng] : fallbackPosition);
            setWebsite(hospital.props.website ? hospital.props.website : `https://www.google.com/search?q=${hospital.props.name}`);
            setStars(hospital.props.star_ranking !== undefined ? hospital.props.star_ranking : 0);
            setDescription(hospital.props.hospital_description !== undefined ? hospital.props.hospital_description : 'This hospital does not have a description yet.');
        }
    }, [hospital]);
   
    return (
        <Box sx={{ display: 'flex', mt: 5 }}>
          <Card sx={{ flex: 1, maxWidth: '210px' }}>
            <CardContent>
              {position && (
                <MapContainer center={position} zoom={12} style={{ height: '25vh', width: '25vh' }}>
                  <TileLayer attribution="&amp;copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {position && <Marker position={position}></Marker>}
                </MapContainer>
              )}
              <StarRanking ranking={stars}></StarRanking>
              <Typography variant='caption' sx={{ fontStyle: 'italic' }}>
                ***Overall star rating provided by Medicare
              </Typography>
              {hospital ? (
                <GoogleMapsLink props={hospital} sx={{ mt: 1 }}>
                  Get Directions
                </GoogleMapsLink>
              ) : null}
              <Typography>
                <Button variant="outlined" component={Link} href={website} sx={{ mt: 1 }}>
                  Website
                </Button>
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, ml: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hospital Information
              </Typography>
              <Typography>
                {description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );      
};

export default Map;
