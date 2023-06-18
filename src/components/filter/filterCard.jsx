import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FilterHospital from './filterHospital';
//import FilterInsurance from './filterInsurance';
import FilterCosts from './filterCosts';
import FilterLocation from './filterLocation';
import { useEffect, useState } from 'react';

function FilterCard(props) {
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(null);
  const [hospitalIds, setHospitalIds] = useState([]);
  const [insurance, setInsurance] = useState(null);
  const [distance, setDistance] = useState(null);

  const handleMinCostChange = (event) => {
    setMinCost(event.target.value);
  };
  const handleMaxCostChange = (event) => {
    setMaxCost(event.target.value);
  };
  const handleHospitalChange = (event) => {
    const {
      target: { value },
    } = event;
    setHospitalIds(value);
  };

  const handleDistanceChange = (event) => {
    // console.log(event.target.value)
    setDistance(event.target.value);
  };
  const handleFilterChange = () => {
    const filters = {minCost: minCost, maxCost: maxCost, hospitalIds: hospitalIds, insurance: insurance, distance: distance}
    props.onChildStateChange(filters);
  }
  return (
    <>
      <Card sx={{ display: 'flex', mt: 5 }}>
      <CardContent sx={{ flex: 1}}>
          <Typography component="h2" variant="h5" gutterBottom textAlign="center">
              Filters
          </Typography>
          <FilterHospital hospitalIds={hospitalIds} handleHospitalChange={handleHospitalChange}/>
          {/* <FilterLocation location={location} handleLocationChange={handleLocationChange}/>
          <FilterInsurance insurance={insurance} handleInsuranceChange={handleInsuranceChange}/> */}
          <FilterCosts handleMinCostChange={handleMinCostChange} handleMaxCostChange={handleMaxCostChange}/>
          <FilterLocation handleDistanceChange={handleDistanceChange}/>
          <Button variant="contained" onClick={handleFilterChange} sx={{mb:1, ml:1}}>Apply</Button>
      </CardContent>
      </Card>
    </>
  );
}

export default FilterCard;