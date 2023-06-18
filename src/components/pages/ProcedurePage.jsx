import Header from '../header/Header';
import Footer from '../footer/Footer';
import Container from '@mui/material/Container';
import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { getDistanceFromLatLonInMiles } from '../../tools/location';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CircularProgress, Typography } from '@mui/material';
import ProcedureInfo from '../procedures/procedureInfo';
import InsurancePriceCard from '../procedures/insurancePriceCard';
import InsuranceForm from '../procedures/insuranceForm';
import CashPriceCard from '../procedures/cashPriceCard'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchResults from '../card/searchResultCard';
import client from '../../api/client';


const ProcedurePage = () => {
    const location = useLocation();
    let procedureId = Number(new URLSearchParams(location.search).get('id'));
    // procedureSearched = parseInt(procedureSearched);
    // console.log(procedureSearched)
    // console.log(typeof(procedureSearched))
    const [userLocation, setUserLocation] = useState(null);
    const [procedureInfo, setProcedureInfo] = useState(false);
    const [insuranceInfo, setInsuranceInfo] = useState(false);
    const [pricePreference, setPricePreference] = useState('cash_price');
    const [formInformation, setFormInformation] = useState(false);
    const [filteredInsurancePrice, setFilteredInsurancePrice] = useState();
    const [comparableProcedures, setComparableProcedures] = useState(false);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

    useEffect(() => {
    
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth < 800);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
    const handlePricePreference = (event, newPricePreference) => {
        // console.log(newPricePreference);
        if(newPricePreference === null) {
            return null;
        };
        setPricePreference(newPricePreference);
    };
    const handleInsuranceFormChange = (childState) => {
      setFormInformation(childState);
      let filteredInsuranceInfo = insuranceInfo.filter((i) => 
      i.insurance_id === childState.insuranceProviderId &&
      i.provider_id === procedureInfo.provider_id);
      setFilteredInsurancePrice(filteredInsuranceInfo[0].insurance_price);
    }
    useEffect(() => {
        const getInsuranceInfo = async () => {
            try {
                let response = await client.get('insurance_procedure.json');
                setInsuranceInfo(response.data?.filter(d => d["id"] === procedureId));
            } catch (e) {
                console.log(e);
            }
        };
        const getProcedureInfoAndComparableProcedures = async () => {
            try {
                let response = await client.get('unique_procedures.json'); //Need to create a new API for this
                //The api should return the procedure info (with the description added), the insurance info, and pricing/insurance info for all other procedures with the same name in the area.
                let tempProcedureInfo = response.data?.filter(d => d["id"] === procedureId)[0];
                setProcedureInfo(tempProcedureInfo);
                setComparableProcedures(response.data?.filter(d => d["procedure_name"] === tempProcedureInfo["procedure_name"] && d["id"] !== procedureId));
            } catch (e) {
                console.log(e);
            }
        };

        getProcedureInfoAndComparableProcedures();
        getInsuranceInfo();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }, []);

    return (
        <>
            <Header />
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Container >
                    <div className="row">
                    <Card sx={{ flex: 1, mt: 5 }}>
                    <CardContent sx={{ flex: 1 }}>
                      <div className="col-9">
                          {procedureInfo 
                          ? 
                          <ProcedureInfo key={procedureInfo.id} procedure={procedureInfo} />
                          : 
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <CircularProgress />
                          </Box>
                          }
                      </div>
                      </CardContent>
                    </Card>  
                    {isSmallScreen ? null : 
                      <div className="col-3">
                        {
                          pricePreference === 'cash_price' ?
                          <CashPriceCard cashPrice={procedureInfo?.cash_price} hospital = {procedureInfo}/>
                          :
                          formInformation ?
                          <InsurancePriceCard insurancePrice={filteredInsurancePrice} formInformation={formInformation}/>
                          :
                          pricePreference === 'insurance_price' ?
                          <CashPriceCard cashPrice={procedureInfo?.cash_price} hospital = {procedureInfo}/>
                          :
                          <div/>
                          }
                          <Card>
                            <ToggleButtonGroup
                        exclusive
                        value={pricePreference}
                        onChange={handlePricePreference}
                        color="primary"
                        >
                        <ToggleButton value="cash_price">View Cash Rate</ToggleButton>
                        <ToggleButton value="insurance_price">View Insurance Rate</ToggleButton>
                    </ToggleButtonGroup>
                    {pricePreference === "insurance_price"
                    ?
                    <div>
                        <br></br>
                        <InsuranceForm handleInsuranceFormChange={handleInsuranceFormChange}/>
                    </div>
                    :
                    <div/>
                    }
                    </Card>
                        </div>}
                        <div>
                        {isSmallScreen ?
                      <div className="col-10">
                        {
                          pricePreference === 'cash_price' ?
                          <CashPriceCard cashPrice={procedureInfo?.cash_price} hospital = {procedureInfo}/>
                          :
                          formInformation ?
                          <InsurancePriceCard insurancePrice={filteredInsurancePrice} formInformation={formInformation}/>
                          :
                          pricePreference === 'insurance_price' ?
                          <CashPriceCard cashPrice={procedureInfo?.cash_price} hospital = {procedureInfo}/>
                          :
                          <div/>
                          }
                          <Card>
                            <ToggleButtonGroup
                        exclusive
                        value={pricePreference}
                        onChange={handlePricePreference}
                        color="primary"
                        >
                        <ToggleButton value="cash_price">View Cash Rate</ToggleButton>
                        <ToggleButton value="insurance_price">View Insurance Rate</ToggleButton>
                    </ToggleButtonGroup>
                    {pricePreference === "insurance_price"
                    ?
                    <div>
                        <br></br>
                        <InsuranceForm handleInsuranceFormChange={handleInsuranceFormChange}/>
                    </div>
                    :
                    <div/>
                    }
                    </Card>
                        </div> : null}
                        </div>
                    </div>
                    <div className="row">
                        <Typography component="h2" variant="h4" color="text.primary" sx={{ mt: 5, flex: 1, overflow: 'auto' }}>
                            <b>
                                {comparableProcedures && comparableProcedures.some(cp => cp.cash_price < procedureInfo?.cash_price) ?
                                     `Save up to $${(procedureInfo.cash_price - comparableProcedures[0].cash_price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}! Check out other options near you`
                                    : `${procedureInfo ? "It looks like you're getting the best price!" : ""}`}
                            </b>
                        </Typography>
                    </div>
                    <div className="row">
                        {comparableProcedures && comparableProcedures.length > 0 ? comparableProcedures.map(cp => 
                            <SearchResults key={cp.id} 
                                procedure={{...cp, 
                                    distance: userLocation ? 
                                    getDistanceFromLatLonInMiles(parseFloat(userLocation.lat), 
                                    parseFloat(userLocation.lng), parseFloat(cp.gps_latitude), 
                                    parseFloat(cp.gps_longitude))
                                    : null}} 
                                comparisonPrice={procedureInfo?.cash_price} />)
                            : ''
                        }
                    </div>
                </Container>    
                </Box>          
            </React.Fragment>
            <Footer />
        </>
    )
}

export default ProcedurePage;