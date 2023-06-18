import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterInsurance(props) {

  return (
    <div>
      <FormControl sx={{ display: 'flex', pb: 2 }}>
        <InputLabel id="demo-simple-select-helper-label">Insurance</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.insurance}
          label="Insurance"
          onChange={props.handleInsuranceChange}
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          <MenuItem value={'DMBA'}>DMBA</MenuItem>
          <MenuItem value={'BCBS'}>BCBS</MenuItem>
          <MenuItem value={'Cash'}>Cash</MenuItem>
        </Select>
        {/* <FormHelperText>Select Insurance</FormHelperText> */}
      </FormControl>
    </div>
  );
}