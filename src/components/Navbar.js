import { Grid, Box, Button } from "@mui/material";
import React from "react";
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

  const HoverLine = styled("div")({
    backgroundColor: "#D6DEEF",
    height: "1px",
    width: "2rem", // default width
    marginRight: "0.5rem",
  });

  const navLinkStyles = ({ isActive }, tabName) => {
    // Check if the current path ends with "/" and the tab is "About"
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
  // Define the tabs based on user login status
  if (user) {
    tabArray = [...tabArray, "Edit My Details", "Logout"];
  } else {
    tabArray = [...tabArray, "Login"];
  }

  const handleLogout = () => {
    logout();
    history("/");
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
            ) : (
              <NavLink
                to={
                  tab === "Edit My Details"
                    ? "/career-details"
                    : tab === "Login"
                    ? "/"
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
      </Grid>
    </>
  );
};

export default Navbar;
