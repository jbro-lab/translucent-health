import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import HospitalPage from "./components/pages/HospitalPage";
import HospitalInfoPage from "./components/pages/HospitalInfoPage";
import StatePage from "./components/pages/StatePage";
import NetworkPage from "./components/pages/NetworkPage";
import ProcedurePage from "./components/pages/ProcedurePage";
import AboutPage from "./components/pages/AboutPage";
import SearchPage from "./components/pages/SearchPage";
import FilterCard from "./components/filter/filterCard";
import CareerPage from "./components/pages/CareerPage";
//import MuiLink from '@mui/material/Link';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/hospitals" element={<HospitalPage />} />
        <Route path="/hospital" element={<HospitalInfoPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/states" element={<StatePage />} />
        <Route path="/networks" element={<NetworkPage />} />
        <Route path="/procedure" element={<ProcedurePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/filterCard" element={<FilterCard />} />
      </Routes>
    </>
  );
};

export default App;
