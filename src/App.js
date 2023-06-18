import React from "react";
import "./App.css";
import { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SearchBar from "../search/SearchBar";
//import MuiLink from '@mui/material/Link';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchable = true;

  const card = {
    image:
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    imageText: "A happy guy",
    title: "Translucent Health",
    description: "Sharing healthcare costs, clearly.",
  };

  return (
    <>
      <Header />
      <Paper
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 0,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top 50px",
          backgroundImage: `url(${card.image})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={card.image}
            alt={card.imageText}
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 4, md: 8 },
                pl: { md: 20 },
                pt: { md: 20 },
                pr: { md: 0 },
                pb: { md: 60 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                {card.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {card.description}
              </Typography>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSearchable={searchable}
                label="Search Procedure Name (e.g. MRI)"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Footer />
    </>
  );
};

export default App;
