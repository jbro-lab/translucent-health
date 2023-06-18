import React from "react";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const InfoToolTip = (props) => {
    const {info} = props;
    return (
        <Tooltip disableFocusListener placement="top-start" title={info}>
            <InfoIcon />
        </Tooltip>
    );
};

export default InfoToolTip;