import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import client from '../../api/client'
import { InputAdornment } from '@mui/material';
import InfoToolTip from '../info/InfoToolTip';

const infoDescriptions = {
  remainingDeductible: "The amount you pay for covered health care services before your insurance plan starts to pay. With a $2,000 deductible, for example, you pay the first $2,000 of covered services yourself. After you pay your deductible, you usually pay only a copayment or coinsurance for covered services. Your insurance company pays the rest.\
  *Description provided by healthcare.gov",
  copayAmount: "A fixed amount ($20, for example) you pay for a covered health care service after you've paid your deductible. Copayments (sometimes called 'copays') can vary for different services within the same plan, like drugs, lab tests, and visits to specialists. Generally plans with lower monthly premiums have higher copayments. Plans with higher monthly premiums usually have lower copayments. \
  *Description provided by healthcare.gov",
  coinsurancePercentage: "The percentage of costs of a covered health care service you pay (20%, for example) after you've paid your deductible. \
  *Description provided by healthcare.gov",
};

function InsuranceForm(props) {
  const [insuranceProviders, setInsuranceProviders] = useState();
  const [insuranceProviderId, setInsuranceProviderId] = useState();
  const [deductible, setDeductible] = useState();
  const [copay, setCopay] = useState();
  const [coinsurance, setCoinsurance] = useState();
  const [insuranceName, setInsuranceName] = useState();

  const getHospitals = async () => {
    try {
        let response = await client.get('insurance.json');
        setInsuranceProviders(response.data);
        // console.log(response.data)
    } catch (e) {
        console.log(e);
    }
  };

  const getInsurance = (id) => {
    const selectedId = id;
    const selectedInsurance = insuranceProviders.find((ip) => ip.id == selectedId);
    setInsuranceName(selectedInsurance.insurance_name);
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

  const handleInsuranceChange = (event) => {
    setInsuranceProviderId(event.target.value);
    getInsurance(event.target.value);
  }
  const handleDeductibleChange = (event) => {
    setDeductible(event.target.value);
  }
  const handleCopayChange = (event) => {
    setCopay(event.target.value);
  }
  const handleCoinsuranceChange = (event) => {
    setCoinsurance(event.target.value);
  }

  const handleFormChange = () => {
    const formInformation = {insuranceProviderId: insuranceProviderId, deductible: deductible, copay: copay, coinsurance: coinsurance, insurance: insuranceName};
    props.handleInsuranceFormChange(formInformation);
  }

  return (
    <React.Fragment>
      <Typography variant='caption' sx={{ fontStyle: 'italic', mr:1, ml:2 }}>
          Enter your info and hit "Apply"
      </Typography>
      <FormControl sx={{ display: 'flex', pb: 2, mr:1, ml:1, mt:1  }}>
        <InputLabel id="demo-simple-select-helper-label">Insurance Provider</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          onChange={handleInsuranceChange}
          input={<OutlinedInput label="Tag" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {insuranceProviders 
          ?
          insuranceProviders.map((ip) => (
            <MenuItem value={ip.id}>
              {ip.insurance_name}
            </MenuItem>
          ))
          :
          <MenuItem value="">Loading</MenuItem>
          }
        </Select>
      </FormControl>
      <FormControl sx={{ display: 'flex', pb: 2, mr:1, ml:1 }}>
        <TextField
          id="outlined-number"
          label="Remaining Deductible This Year"
          type="number"
          onChange={handleDeductibleChange}
          required
          prefix="$"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                $
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <InfoToolTip info={infoDescriptions.remainingDeductible} />
              </InputAdornment>
            ),
            inputProps: {
              min: 0,
              onKeyDown: (event) => {
                if (event.keyCode === 40 && event.target.value <= 0) {
                  event.preventDefault();
                }
              },
              onInput: (event) => {
                const value = event.target.value;
                if (value < 0) {
                  event.target.value = "";
                }
              },
            }
          }}
        />
      </FormControl>
      <FormControl sx={{ display: 'flex', pb: 2, mr:1, ml:1  }}>
        <TextField
          id="outlined-number"
          label="Copay Amount"
          type="number"
          onChange={handleCopayChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                $
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <InfoToolTip info={infoDescriptions.copayAmount} />
              </InputAdornment>
            ),
            inputProps: {
              min: 0,
              onKeyDown: (event) => {
                if (event.keyCode === 40 && event.target.value <= 0) {
                  event.preventDefault();
                }
              },
              onInput: (event) => {
                const value = event.target.value;
                if (value < 0) {
                  event.target.value = "";
                }
              },
            }
          }}
        />
      </FormControl>
      <FormControl sx={{ display: 'flex', pb: 2, mr:1, ml:1  }}>
        <TextField
          id="outlined-number"
          label="Coinsurance Percentage"
          type="number"
          onChange={handleCoinsuranceChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                %
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <InfoToolTip info={infoDescriptions.coinsurancePercentage} />
              </InputAdornment>
            ),
            inputProps: {
              min: 0,
              onKeyDown: (event) => {
                if (event.keyCode === 40 && event.target.value <= 0) {
                  event.preventDefault();
                }
              },
              onInput: (event) => {
                const value = event.target.value;
                if (value < 0) {
                  event.target.value = "";
                }
              },
            }
          }}
        />
      </FormControl>
      <Button variant="contained" onClick={handleFormChange} sx={{ display: 'block', margin:'0 auto', mb:1 }}>Apply</Button>
    </React.Fragment>
  );
}

export default InsuranceForm;