import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import Link from "@mui/material/Link";

const Header = () => {
  const [scroll, setScroll] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset);
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = {
    color: scroll > 50 ? "black" : "white",
  };

  const styleMain = {
    color: scroll > 50 ? "#42a5f5" : "white",
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: scroll > 50 ? "white" : "black",
        transition: "background-color 200ms linear",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button component={Link} href="#/" style={styleMain}>
            Translucent Health
          </Button>
        </Typography>
        {isSmallScreen ? (
          <IconButton color="inherit" onClick={handleMenuToggle} style={style}>
            {menuOpen ? <Close /> : <Menu />}
          </IconButton>
        ) : (
          <>
            <Button component={Link} href="#/search" style={style}>
              Search
            </Button>
            <Button component={Link} href="#/hospitals" style={style}>
              Hospitals
            </Button>
            <Button component={Link} href="#/about" style={style}>
              About Us
            </Button>
          </>
        )}
      </Toolbar>
      {menuOpen && (
        <div
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "56px",
            left: "0",
            right: "0",
            zIndex: "1",
          }}
        >
          <Button
            component={Link}
            href="#/search"
            style={{ color: "black", display: "block", padding: "10px 20px" }}
          >
            Search
          </Button>
          <Button
            component={Link}
            href="#/hospitals"
            style={{ color: "black", display: "block", padding: "10px 20px" }}
          >
            Hospitals
          </Button>
          <Button
            component={Link}
            href="#/about"
            style={{ color: "black", display: "block", padding: "10px 20px" }}
          >
            About Us
          </Button>
        </div>
      )}
    </AppBar>
  );
};

export default Header;
