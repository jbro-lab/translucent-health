import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';


export default function FilterCosts(props) {

  return (

    <div>
      <FormControl sx={{ display: 'flex', pb: 2 }}>
        <TextField
          id="outlined-number"
          label="Minimum Cash Price"
          type="number"
          onChange={props.handleMinCostChange}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
            $
          </InputAdornment>)
          }}
        />
      </FormControl>
      <FormControl sx={{ display: 'flex', pb: 2 }}>
        <TextField
          id="outlined-number"
          label="Maximum Cash Price"
          type="number"
          onChange={props.handleMaxCostChange}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
            $
          </InputAdornment>)
          }}
        />
      </FormControl>
    </div>
  );
}