import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from "@mui/material/OutlinedInput";
import { useEffect, useState } from 'react';
import client from '../../api/client'

const completedHospitals = [
  "Utah Valley Hospital",
  "Spanish Fork Hospital",
  "Intermountain Medical Center",
  "American Fork Hospital"
]

export default function FilterHospital(props) {
  const [hospitals, setHospitals] = useState();

  const getHospitals = async () => {
    try {
        let response = await client.get('getHospitals.json');
        const filteredHospitalList = response.data.filter((h) => {
          return completedHospitals.includes(h.name);
        })
        setHospitals(filteredHospitalList);
    } catch (e) {
        console.log(e);
    }
  };
  const getSelectedHospitals = () => {
    let selectedHospitals = hospitals.filter((h) => props.hospitalIds.includes(h.id));
    return selectedHospitals.map((h) => h.name);
  }
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    } else {
      return str;
    }
  };
  useEffect(() => {
    getHospitals();
  }, []);
  return (
    <div>
      <FormControl sx={{ display: 'flex', pb: 2 }}>
        <InputLabel id="demo-simple-select-helper-label">Hospital</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={props.hospitalIds}
          onChange={props.handleHospitalChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={() => {
            const selectedHospitals = getSelectedHospitals();
            if (selectedHospitals.length === 0) {
              return 'Any';
            } else if (selectedHospitals.length === 1) {
              return truncateString(selectedHospitals[0], 20);
            } else {
              return `${selectedHospitals.length} selected`;
            }
          }}
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          {hospitals 
          ?
          hospitals.map((h) => (
            <MenuItem value={h.id}>
              <Checkbox checked={props.hospitalIds.includes(h.id)}/>
              <ListItemText primary={h.name} />
            </MenuItem>
          ))
          :
          <MenuItem value="">Loading</MenuItem>
          }
        </Select>
      </FormControl>
    </div>
  );
}