import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import CardActionArea from '@mui/material/CardActionArea';
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { Button } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function SearchResults(props) {
  const { procedure, comparisonPrice } = props;
  const [expanded, setExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 400);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHospitalClick = () => {
    const h = procedure.name;
    const hospitalSearchParams = new URLSearchParams({ h });
    const url = `#/hospital?${hospitalSearchParams.toString()}`;
    window.location.href = url;
  };

  const handleCardClick = () => {
    const id = procedure.id;
    const ProcedureSearchParams = new URLSearchParams({ id });
    const originalUrl = window.location.href;
    const url = `#/procedure?${ProcedureSearchParams.toString()}`;
    window.location.href = url;
    if (originalUrl.includes("procedure")) {
      window.location.reload();
    }
  };

  return (
    <Grid item xs={12} md={6} mt={5}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography component="h2" variant="h5">
              {/^.*\.$/.test(procedure.procedure_name)
                ? procedure.procedure_name.slice(
                    0,
                    procedure.procedure_name.length - 1
                  )
                : procedure.procedure_name}
            </Typography>
            <Button
              variant="contained"
              onClick={handleCardClick}
              sx={{ flexShrink: 0 }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textTransform: "none" }}
              >
                {isSmallScreen ? <ReadMoreIcon /> : "See All Rates"}
              </Typography>
            </Button>
          </div>
          <Typography variant="subtitle1" color="text.secondary">
            More
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              size="small"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="subtitle1" color="text.secondary">
              Gross Charge to Insurance: $
              {procedure.gross_charge
                ? procedure.gross_charge
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                : null}
            </Typography>
          </Collapse>
          <Typography
            variant="h6"
            color={
              comparisonPrice && comparisonPrice > procedure.cash_price
                ? "green"
                : "black"
            }
          >
            Cash Price: $
            {procedure.cash_price
              ? procedure.cash_price
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              : null}
          </Typography>
          <Button
            variant="text"
            onClick={handleHospitalClick}
            sx={{ paddingLeft: 0 }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              {procedure.name}
            </Typography>
          </Button>
          {procedure.distance ? (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textTransform: "none" }}
            >
              {procedure.distance < 1
                ? "Less Than 1"
                : procedure.distance.toFixed(0)}{" "}
              mile{procedure.distance <= 1 ? "" : "s"}
            </Typography>
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SearchResults;
