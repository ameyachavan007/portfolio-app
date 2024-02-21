import { Grid, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useAuth } from "../utils/auth";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const history = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { userName } = useParams();
  // State to manage the copy status
  const [copySuccess, setCopySuccess] = useState(false);

  const profileLink = `https://portfolio-app-zeta-five.vercel.app/${userName}`;

  // Function to handle copying the profile link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000); // Reset copy status after 3 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const HoverLine = styled("div")({
    backgroundColor: "#D6DEEF",
    height: "1px",
    width: "2rem", // default width
    marginRight: "0.5rem",
  });

  const navLinkStyles = ({ isActive }, tabName) => {
    const isAboutActive =
      (currentPath === `/${userName}` || currentPath === "/") &&
      tabName === "About";

    return {
      color: "#D6DEEF",
      opacity: isActive || isAboutActive ? 1 : 0.6,
      textDecoration: "none",
      fontWeight: isActive || isAboutActive ? "bolder" : "400",
      width: "100%", // Cover full width of the grid item
      display: "flex", // Use flex to align children
      alignItems: "center", // Align items vertically center
    };
  };

  let tabArray = ["About", "Projects", "Experience"];

  if (user) {
    tabArray = [...tabArray, "Edit My Details", "Logout"];
  } else {
    tabArray = [...tabArray, "Login"];
  }

  const handleLogout = () => {
    logout();
    history("/login");
  };

  

  return (
    <>
      <Grid container>
        {tabArray.map((tab, index) => (
          <Grid item className="nav-item" xs={12} key={index}>
            {tab === "Logout" ? (
              <Button onClick={handleLogout} style={{ color: "#D6DEEF" }}>
                Logout
              </Button>
            ) : tab === "Login" ? (
              <Button
                component={NavLink}
                to={"/"}
                className="nav-link"
                sx={{color: "#1eff00", fontSize: '1rem', mt: 1}}
              >
                Login / Build Your Portfolio!!
              </Button>
            ) : (
              <NavLink
                to={
                  tab === "Edit My Details"
                    ? "/career-details"
                    : tab.toLowerCase().replace(/\s+/g, "-")
                }
                style={(props) => navLinkStyles(props, tab)}
                className="nav-link"
              >
                <Box component="div" display={"flex"} alignItems={"center"}>
                  <HoverLine className="hover-line" />
                  {tab}
                </Box>
              </NavLink>
            )}
          </Grid>
        ))}
         <Grid item className="nav-item" xs={12}>
          <Button onClick={copyToClipboard} sx={{ color: "#FFA500", fontSize: '1rem',mb: 1}}>
            {copySuccess ? "Copied!" : "Copy Your Portfolio Link"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
