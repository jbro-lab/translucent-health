import React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function GoogleMapsLink(props) {

  const [address, setAddress] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // setAddress(props.props.props.street_address + " " + props.props.props.state + " " + props.props.props.zip_code);
    setAddress(props.props.props.name)
    setUrl(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
    // I need some help on what's going on above here amigos
  }, [props]);
  
  return (
    <>
    {url !== "" ?
    <Button component={Link} variant="outlined" href={url} target="_blank" rel="noopener noreferrer">
      {props.children}
    </Button> : null}
    </>
  );
}

export default GoogleMapsLink;