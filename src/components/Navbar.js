import { Grid, Box, Button, useMediaQuery } from "@mui/material";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useAuth } from "../utils/auth";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "@emotion/react";

const Navbar = ({ aboutRef, projectsRef, experiencesRef, scrollToSection }) => {
  const { user, logout } = useAuth();
  const history = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { userName } = useParams();

  // const aboutRef = useRef(null); 
  // const projectsRef = useRef(null); 
  // const experiencesRef = useRef(null);

  // State to manage the copy status
  const [copySuccess, setCopySuccess] = useState(false);

  const profileLink = `https://portfolio-app-zeta-five.vercel.app/${userName}`;

  const theme = useTheme();
  const isAboveMedium = useMediaQuery("(min-width: 1025px)");

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
    '&: hover': {
      backgroundColor: 'white',
    }
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

  let tabArray = ["About", "Experience", "Projects"];

  if (user) {
    tabArray = [...tabArray, "Edit My Details"];
  }


  const handleLogout = () => {
    logout();
    history("/login");
  };

  // Function to handle scrolling to a specific section
  const scrollToRef = (refName) => {
    let ref = null;

    switch (refName) {
      case "about-ref":
        ref = aboutRef;
        break;
      case "projects-ref":
        ref = projectsRef;
        break;
      case "experience-ref":
        ref = experiencesRef;
        break;
      default:
        ref = null;
    }

    if (ref && ref.current) {
      scrollToSection(ref);
    }
  };

  return (
      <nav>
       {isAboveMedium && (
        <div>
          {tabArray.map((tab, index) => (
            <div key={index} style={{ padding: '0.75rem 0rem'}} className="nav-item">
              <NavLink
                to={tab === "Edit My Details" ? "/career-details" : `${tab.toLowerCase().replace(/\s+/g, "-")}`}
                // isActive={() => activeSection === `${tab.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => scrollToRef(`${tab.toLowerCase().replace(/\s+/g, "-")}-ref`)}
                style={(props) => navLinkStyles(props, tab)}
              >
                <HoverLine className="hover-line"/>
                {tab}
              </NavLink>
            </div>
          ))}
        </div>
      )}
        <div>
          { user ? (<Button
                sx={{
                  color: 'rgb(94 234 212)',
                  letterSpacing: '0.025rem',
                  backgroundColor: 'rgba(45,212,191,.1)',
                  mt: 2,
                  textTransform: 'none'
                }}
                onClick={handleLogout}
              >Logout</Button>) : (<span
                style={{
                  border: "1px solid",
                  display: "inline-block",
                  padding: "5px 10px",
                  animation: "pulse 1.5s infinite",
                  borderRadius: '5px',
                  marginTop: 2,
                  backgroundColor: 'rgba(45,212,191,.1)',
                }}
              >
                <NavLink
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: 'rgb(94 234 212)',
                  }}
                >Login / Generate Your Portfolio!!</NavLink>
              </span>) }
        </div>
        <div> 
          <Button onClick={copyToClipboard} 
            sx={{
              color: 'rgb(94 234 212)',
              backgroundColor: 'rgba(45,212,191,.1)',
              mt: 2,
              textTransform: 'none',
              fontStyle: 'italic'
            }}
          >
            {copySuccess ? "Copied!" : "Copy a link to this Portfolio"}
          </Button>
        </div>
      </nav>
  );

  

  // return (
  //   <>
  //     <Grid container>
  //       {tabArray.map((tab, index) => (
  //         <Grid item className="nav-item" xs={12} key={index}>
  //           {tab === "Logout" ? (
  //             <Button onClick={handleLogout} style={{ color: "#D6DEEF" }}>
  //               Logout
  //             </Button>
  //           ) : tab === "Login" ? (
  //             <Button
  //               component={NavLink}
  //               to={"/"}
  //               className="nav-link"
  //               sx={{color: "#1eff00", fontSize: '1rem', mt: 1}}
  //             >
  //               Login / Build Your Portfolio!!
  //             </Button>
  //           ) : (
  //             <NavLink
  //               to={
  //                 tab === "Edit My Details"
  //                   ? "/career-details"
  //                   : tab.toLowerCase().replace(/\s+/g, "-")
  //               }
  //               style={(props) => navLinkStyles(props, tab)}
  //               className="nav-link"
  //             >
  //               <Box component="div" display={"flex"} alignItems={"center"}>
  //                 <HoverLine className="hover-line" />
  //                 {tab}
  //               </Box>
  //             </NavLink>
  //           )}
  //         </Grid>
  //       ))}
  //        <Grid item className="nav-item" xs={12}>
  //         <Button onClick={copyToClipboard} sx={{ color: "#FFA500", fontSize: '1rem',mb: 1}}>
  //           {copySuccess ? "Copied!" : "Copy Your Portfolio Link"}
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   </>
  // );
};

export default Navbar;
