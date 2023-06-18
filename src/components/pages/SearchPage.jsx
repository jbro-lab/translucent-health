import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SearchResults from '../card/searchResultCard';
import FilterCard from '../filter/filterCard';
import { isNullOrZero } from '../../tools/string-tools';
import SearchBar from '../search/SearchBar';
import { useLocation } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { getDistanceFromLatLonInMiles } from '../../tools/location';
import client from '../../api/client';
import TuneIcon from '@mui/icons-material/Tune';
import { IconButton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Grid from '@mui/material/Grid';

function filterByJaro(data, query, filters, userLocation) {
  if(!query &&  isNullOrZero(filters.minCost) && isNullOrZero(filters.maxCost) && filters.hospitalIds.length <= 0 && isNullOrZero(filters.distance)){
    return data;
  }
  let filteredData = data.slice();
  let noMatches = false;
  const similarityThreshold = 0.95;
  const noResultsSimilarityThreshold = 0.75;
  //eslint-disable-next-line array-callback-return
  if(!isNullOrZero(filters.maxCost)) {
    filteredData = filteredData.filter((d) => {
      return (d['cash_price'] >= filters.minCost && d['cash_price'] <= filters.maxCost)
    });
  }
  if(filters.hospitalIds.length > 0 ) {
    filteredData = filteredData.filter((d) => {
      return filters.hospitalIds.includes(d['provider_id']);
    });
  }
  if (!isNullOrZero(filters.distance)) {
    filteredData = filteredData.filter((d) => {
      const latlongDistance = getDistanceFromLatLonInMiles(parseFloat(userLocation.lat), parseFloat(userLocation.lng), parseFloat(d.gps_latitude), parseFloat(d.gps_longitude)); // convert Km to Mi
      return latlongDistance < parseFloat(filters.distance); // Only show hospitals within set distance
    });
  } 
  if(!query) {
    return filteredData;
  }
  const queryTextCleanArray = [...new Set(query.replace(/[-^&$%#@!)(*:;"'?><|]/gi, '').toLocaleLowerCase().split(' '))];

  let allJaroScores = [];
  // eslint-disable-next-line array-callback-return
  filteredData = filteredData.filter((d) => {
    let descriptionClean = d['procedure_name'].replace(/[-^&$%#@!)(*:;"'?><|]/gi, '').toLocaleLowerCase();
    let descriptionCleanArray = [...new Set(descriptionClean.split(' '))];
    const jaroScores = descriptionCleanArray.map(dc => queryTextCleanArray.map(q => jaroSimilarity(dc, q))).flat()
    if (jaroScores.some(js => js >= similarityThreshold)) {
      allJaroScores.push(jaroScores.sort((a,b) => b - a));
      return d
    }
  })

  if(filteredData.length === 0){
    filteredData = data.slice();
    // eslint-disable-next-line array-callback-return
    filteredData = filteredData.filter((d) => {
      let descriptionClean = d['procedure_name'].replace(/[-^&$%#@!)(*:;"'?><|]/gi, '').toLocaleLowerCase();
      let descriptionCleanArray = [...new Set(descriptionClean.split(' '))];
      const jaroScores = descriptionCleanArray.map(dc => queryTextCleanArray.map(q => jaroSimilarity(dc, q))).flat()
      if (jaroScores.some(js => js >= noResultsSimilarityThreshold)) {
        allJaroScores.push(jaroScores.sort((a,b) => b - a));
        return d
      }
    })
    noMatches = true;
  }

  const filteredDataWithScores =  filteredData.map((d, idx) => ({...d, scores: allJaroScores[idx], noMatches}))

  return filteredDataWithScores.sort((a, b) => {
    const smallerArrayLength = a.scores.length <= b.scores.length ? a.scores.length : b.scores.length;
    for (let i = 0; i < smallerArrayLength; i += 1){
      if(a.scores[i] < b.scores[i]) {
        return 1;
      }
      if(a.scores[i] > b.scores[i]){
        return -1;
      }
    }
    return (a.scores.reduce((a, b) => a + b) / a.scores.length) - (b.scores.reduce((a, b) => a + b) / b.scores.length);
  })
}

function jaroSimilarity(s1, s2) {
  const windowSize = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
  const s1Matches = new Array(s1.length).fill(false);
  const s2Matches = new Array(s2.length).fill(false);
  let matchingCharacters = 0;
  let transpositions = 0;
  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - windowSize);
    const end = Math.min(i + windowSize + 1, s2.length);
    for (let j = start; j < end; j++) {
      if (s2Matches[j]) {
        continue;
      }
      if (s1[i] !== s2[j]) {
        continue;
      }
      s1Matches[i] = true;
      s2Matches[j] = true;
      matchingCharacters++;
      break;
    }
  }
  if (matchingCharacters === 0) {
    return 0;
  }
  let k = 0;
  for (let i = 0; i < s1.length; i++) {
    if (!s1Matches[i]) {
      continue;
    }
    while (!s2Matches[k]) {
      k++;
    }
    if (s1[i] !== s2[k]) {
      transpositions++;
    }
    k++;
  }
  return (
    (matchingCharacters / s1.length +
      matchingCharacters / s2.length +
      (matchingCharacters - transpositions / 2) / matchingCharacters) /
    3
  );
}

const SearchPageProcedures = () => {
  const [procedures, setProcedures] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [userLocation, setUserLocation] = useState(null);
  const query = new URLSearchParams(location.search).get('query');
  const [currentPage, setCurrentPage] = useState(1);
  const [proceduresPerPage] = useState(10);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  useEffect(() => {
      const getProcedureInfo = async () => {
          try {
              let response = await client.get('unique_procedures.json');
              setProcedures(response.data);
          } catch (e) {
              console.log(e);
          }
      };
      getProcedureInfo();
  }, []);

  useEffect(() => {
      if (query != null) {
          setSearchQuery(query)
      }
  }, [query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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


  const [filters, setFilters] = useState({minCost: 0, maxCost: null, hospitalIds: [], insurance: null, distance: null});
  const filteredProcedures = procedures?.length > 0 ? filterByJaro(procedures, searchQuery, filters, userLocation) : [];
  const indexOfLastProcedure = currentPage * proceduresPerPage;
  const indexOfFirstProcedure = indexOfLastProcedure - proceduresPerPage;
  const currentProcedures = filteredProcedures.slice(indexOfFirstProcedure, indexOfLastProcedure);

  const [filterOpen, setFilterOpen] = useState(false);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChildStateChange = (childState) => {
    setFilters(childState);
  }
  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };
  return (
      <>
          <Header />
          <React.Fragment>
              <Container  sx={{ mt: 10}}>
              <Grid container alignItems="center" justify="center" spacing={2}>
              <Grid item xs>
                  <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isSearchable={false} label="Seach Procedure"/>
                </Grid>
                <Grid item xs="auto">
                  {isSmallScreen ? (filterOpen ? <IconButton onClick={handleFilterToggle}><ExpandLessIcon /></IconButton> : <IconButton onClick={handleFilterToggle}><TuneIcon /></IconButton>) : null}
                </Grid>
              </Grid>
              {filterOpen ? (isSmallScreen ? <FilterCard onChildStateChange={handleChildStateChange}/> : null) : null}
              <div className="row">
                {isSmallScreen ? null : <div className="col-3">
                      <FilterCard onChildStateChange={handleChildStateChange}/>
                  </div>}
                  <div className={isSmallScreen ? "col-12" : "col-9"}>
                    {procedures && (currentProcedures[0]?.noMatches === true || currentProcedures.length === 0) ?<Container  sx={{ mt: 10}} align="center">
                        <Typography component="h1" variant="h5">No results for "{searchQuery}"</Typography></Container>: null}
                    {procedures ? currentProcedures.map((procedure, index) => {
                      if(procedure.noMatches && index === 0){
                        return (<div><Container align="center">
                        <Typography component="h3" variant="h5">Perhaps these are what you're looking for?</Typography></Container><br></br><SearchResults key={procedure.id} procedure={procedure} /></div>)
                      }
                      return <SearchResults key={procedure.id} procedure={{...procedure, distance: userLocation? getDistanceFromLatLonInMiles(parseFloat(userLocation.lat), parseFloat(userLocation.lng), parseFloat(procedure.gps_latitude), parseFloat(procedure.gps_longitude)): null}} />
                    }): <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                        </Box>
                    }
                    {filteredProcedures.length > proceduresPerPage ? (
                      <Container sx={{ mt: 5, display: 'flex', justifyContent: 'left' }}>
                        <Pagination
                          proceduresPerPage={proceduresPerPage}
                          totalProcedures={filteredProcedures.length}
                          paginate={paginate}
                          currentPage={currentPage}
                        />
                        </Container>
                    ) : null}
                  </div>
              </div> 
              </Container>
          </React.Fragment>
          <Footer />
      </>
  )
}

export default SearchPageProcedures;