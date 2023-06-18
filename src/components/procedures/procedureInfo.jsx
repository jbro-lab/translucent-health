import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProcedureInfo(props) {
  const { procedure } = props;

  const handleHospitalClick = () => {
    const h = procedure.name
    const hospitalSearchParams = new URLSearchParams({ h });
    const url = `hospital?${hospitalSearchParams.toString()}`;
    window.location.href = url;
  };

  return (
    <React.Fragment>
      <h1><b>{/^.*\.$/.test(procedure.procedure_name)
              ? procedure.procedure_name.slice(0,procedure.procedure_name.length - 1)
              : procedure.procedure_name}</b></h1>
      <br></br>
      <h3>Official Medical Name: {procedure.original_procedure_name}</h3>
      <br></br>
      <h3>
      <Button variant="text" onClick={handleHospitalClick} sx={{ paddingLeft: 0 }}>
            <Typography variant="h4" color="primary" sx={{ textTransform: 'none' }}>
              {procedure.name}
            </Typography>
          </Button>
          </h3>
      <br></br>
      <h4>Description</h4>
      <p>{procedure.generated_procedure_description}</p>
      <br></br>
    </React.Fragment>
  );
}

export default ProcedureInfo;
