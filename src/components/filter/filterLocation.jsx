import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function FilterLocation(props) {

  return (
    <>
      <FormControl sx={{ display: 'flex', pb: 2 }}>
        <TextField
          id="outlined-number"
          label="Distance (in miles)"
          type="number"
          onChange={props.handleDistanceChange}
        />
      </FormControl>
    </>
  );
}