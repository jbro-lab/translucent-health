import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Container, Grid, Typography, Paper } from "@mui/material";

const AboutPage = () => {
  return (
    <>
      <Header />
      <React.Fragment>
        <Paper
          sx={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "grey.800",
            color: "#ffff",
            mb: 0,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(https://source.unsplash.com/B7DC1E0My8o)`,
          }}
        >
          <div
            sx={{
              height: "100%",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(https://source.unsplash.com/B7DC1E0My8o)`,
            }}
          >
            <Container sx={{ py: 6, pt: "25vh" }}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontColor: "black",
                      fontWeight: 700,
                      mb: "calc(1rem + 1vw)",
                    }}
                  >
                    We're trying to publish health costs. It's a pretty big
                    deal.
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: "calc(0.5rem + 1vw)",
                      lineHeight: "1.2",
                    }}
                  >
                    Healthcare Costs Can Be Rough
                  </Typography>
                  <Typography variant="body1" sx={{ mb: "calc(1rem + 1vw)" }}>
                    People have no idea what they may have to pay out of pocket
                    when seeking medical care, due to pre-negotiated rates
                    depending on the insurance provider and lack of published
                    costs beforehand. This is a major frustration point for a
                    lot of people, and it even drives some to postpone receiving
                    essential medical care.
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: "calc(0.5rem + 1vw)",
                      lineHeight: "1.2",
                    }}
                  >
                    Our Why
                  </Typography>
                  <Typography variant="body1" sx={{ mb: "calc(1rem + 1vw)" }}>
                    Somehow, everyone knows this is an issue, but nobody does
                    anything about it. We take the published costs from
                    hospitals (which are difficult to find and near impossible
                    to search) and put them into an easy-to-use application,
                    that hopefully helps at least a little with knowing more
                    about healthcare prices. Needing health care sucks enough,
                    we aim to help you know your costs.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Paper>
      </React.Fragment>
      <Footer />
    </>
  );
};

export default AboutPage;

// {/* <Container maxWidth="md" padding="lg" sx={{mt:7}}>
//     <Container maxWidth="sm" padding="lg">
//         <Typography variant="h3" align="center" color="textPrimary">
//             About Us
//         </Typography>
//         <Typography variant="h6" align="center" color="#29335C" paragraph>
//             Translucent Health shines a light on heathcare and illuminates the true prices hospitals charge
//         </Typography>
//     </Container>
//     <Typography align="left" paragraph>
//         <strong>Problem:</strong>
//         <br />
//         Healthcare costs are a black box.
//         People have no idea what they may have to pay out of pocket when seeking medical care, due to pre-negotiated rates depending on the insurance provider and lack of published costs beforehand. This is a major frustration point for a lot of people, and it even drives some to postpone receiving essential medical care.
//     </Typography>
//     <Typography align="left" paragraph>
//         <strong>Solution:</strong>
//         <br />
//         <i>Translucent Health</i> will empower users to quickly find accurate estimates for healthcare costs. This will help users to make informed decisions about where to go for healthcare treatment, and how much they can expect to spend on standard procedures.
//     </Typography>
// </Container> */}
