import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { isNullOrZero } from '../../tools/string-tools';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

function InsurancePriceCard(props) {
  const [expanded, setExpanded] = useState(false);
  const insuranceName = props.formInformation.insurance ? props.formInformation.insurance : null;
  const deductible = props.formInformation.deductible ? parseInt(props.formInformation.deductible) : null;
  const copay = props.formInformation.copay ? parseInt(props.formInformation.copay) : null;
  const coinsuranceRate = props.formInformation.coinsurance ? parseFloat(props.formInformation.coinsurance) / 100 : null;
  const insurancePrice = props.insurancePrice ? parseInt(props.insurancePrice) : null;
  const [charge, setCharge] = useState(0);
  const [insuranceCoverage, setInsuranceCoverage] = useState(0);
  const [coinsurance, setCoinsurance] = useState(0.0);
  const {width} = props;
  const calculateCharge = () => {
    setCoinsurance(0.0);
    let charge = 0;
    let remainingBalance = insurancePrice;
    if (!isNullOrZero(copay)) {
      charge += copay;
    }
    if (remainingBalance >= deductible) {
      charge += deductible;
      remainingBalance -= deductible;
      if(!isNullOrZero(coinsuranceRate) && remainingBalance > 0) {
        let coinsurance = remainingBalance * parseFloat(coinsuranceRate);
        coinsurance = coinsurance.toFixed(2);
        // charge = parseFloat(charge).toFixed(2);
        charge = charge + parseFloat(coinsurance);
        remainingBalance -= parseFloat(coinsurance);
        setCoinsurance(parseFloat(coinsurance));
      }
    }
    else {
      charge += remainingBalance;
      remainingBalance = 0;
    }
    setCharge(charge.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    setInsuranceCoverage(remainingBalance);
  }
  useEffect(() => {
    calculateCharge();
    //charge.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }, [props.formInformation, props.insurancePrice]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    insurancePrice != null
    ?
    <Grid item xs={12} md={6} mt={5}>
      <Card sx={{mx:"auto", display: 'flex' }}>
      <CardContent sx={{ width: (width ? width : 400), flex: 1, overflow: 'auto' }}>
            <Typography component="h2" variant="h5" color="text.secondary">
            Price with {insuranceName}:
            </Typography>
            <Typography component="h2" variant="h4" color="text.primary">
            ${charge}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            Cost Breakdown
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              size="small"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="subtitle1" color="text.secondary">
            Deductible: ${deductible ? deductible.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            Copay: ${copay ? copay.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            Coinsurance: ${coinsurance}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            Full charge to insurance: ${insurancePrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            Your insurance will pay: ${insuranceCoverage.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            <b>You will pay: ${charge}</b>
            </Typography>
          </Collapse>
      </CardContent>
      </Card>
    </Grid>
    : //If the insurance price is null, render the following
    <Grid item xs={12} md={6} mt={5}>
      <Card sx={{ display: 'flex' }}>
      <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
          This hospital doesn't have a negotiated rate for this insurance provider
          </Typography>
      </CardContent>
      </Card>
    </Grid>
  );
}
export default InsurancePriceCard;