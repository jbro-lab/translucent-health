import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import HospitalsReturned from '../card/resultCard';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '../pagination/Pagination';
import SearchBar from '../search/SearchBar';
import client from '../../api/client'

const sections = [
  { title: 'Hospitals', url: '/hospitals' },
  { title: 'States', url: '/states' },
  { title: 'Networks', url: '/networks' },
  { title: 'Procedures', url: '/procedures' },
  { title: 'About Us', url: '/about' }
];

const title = 'Translucent Health';

const description = 'This is the footer';

function filterByJaro(data, query) {
  if (!query) {
    return data;
  }
  
  const similarityThreshold = 0.8;
  const noResultsSimilarityThreshold = 0.5;
  
  let filteredData = data.filter((d) => {
    let descriptionClean = d.name.toLowerCase().replace(/[-^&$%#@!)(*:;"'?><|]/gi, '');
    const jaroScore = jaroSimilarity(descriptionClean, query);
    return jaroScore >= similarityThreshold;
  });

  if (filteredData.length === 0) {
    filteredData = data.filter((d) => {
      let descriptionClean = d.name.toLowerCase().replace(/[-^&$%#@!)(*:;"'?><|]/gi, '');
      const jaroScore = jaroSimilarity(descriptionClean, query);
      return jaroScore >= noResultsSimilarityThreshold;
    });
  }

  return filteredData;
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

const DefaultPage = () => {
  const [hospitals, setHospitals] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitalsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredHospitals = hospitals?.length > 0 ? filterByJaro(hospitals, searchQuery) : [];
  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  const getHospitals = async () => {
    try {
      let response = await client.get('getHospitals.json');
      setHospitals(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getHospitals();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


    return (
        <>
            <Header sections={sections} title={title} />
            <Container sx={{ mt: 5}} item xs={12} md={6} mt={5}>
              <Container align="center" >
              <Container align="center" sx={{ mb: 3}}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isSearchable={false} label="Seach Hospitals"/>
              </Container>
                <Grid container spacing={4}>
                <div className="col-12">
                {hospitals ? currentHospitals.map((hospital) => (
                  <HospitalsReturned key={hospital['id']} hospital={hospital} />
                )): <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
              }
              </div>
                </Grid>
                <Container sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    paginate={paginate}
                    proceduresPerPage={hospitalsPerPage}
                    totalProcedures={filteredHospitals.length}
                    currentPage={currentPage}
                  />
                </Container>
              </Container>
              </Container>
            <Footer description={description} title={title} />
        </>
    )
};

export default DefaultPage;
