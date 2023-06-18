import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import HospitalPage from "./components/pages/HospitalPage";
import HospitalInfoPage from "./components/pages/HospitalInfoPage";
import StatePage from "./components/pages/StatePage";
import NetworkPage from "./components/pages/NetworkPage";
import ProcedurePage from "./components/pages/ProcedurePage";
import AboutPage from "./components/pages/AboutPage";
import SearchPage from "./components/pages/SearchPage";
import FilterCard from "./components/filter/filterCard";
import CareerPage from "./components/pages/CareerPage";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
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
    </HashRouter>
  </React.StrictMode>
);
