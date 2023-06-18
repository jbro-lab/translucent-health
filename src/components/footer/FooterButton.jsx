import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const FooterButton = (props) => {
  const {hidden} = props;
  const textColor = (hidden ? "white" : "black");
  return (
    <Button
    variant="text"
    component={Link}
    href={props.href}
      sx={{
        minWidth: 0,
        width: 'auto',
        textTransform: 'none',
        paddingLeft: 0,
        lineHeight: 1.5,
        color: textColor,
        textDecoration: 'none',
        textAlign: 'left',
        '&:hover': {
        paddingLeft: 0,
          color: textColor,
          textDecoration: 'underline',
          backgroundColor: 'transparent',
          fontWeight: 'bold',
        },
        '& .MuiButton-label': {
            paddingLeft: 0,
            justifyContent: 'flex-start',
          },
      }}
    >
      {props.text}
    </Button>
  );
};

export default FooterButton;