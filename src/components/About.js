import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const About = () => {
  const history = useNavigate();
  const { userName } = useParams();
  // const baseURL = `http://localhost:8080/${userName}/about`
  const baseURL = `https://portfolio-server-smoky-six.vercel.app/${userName}/about`;
  const [aboutData, setAboutData] = useState("");

  const theme = useTheme();
  const isAboveMedium = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(baseURL);
        setAboutData(response.data.about);
      } catch (error) {
        console.log("Error in fetching about data: ", error);
        if (error.response &&
          error.response.data &&
          error.response.data.error === "About data not found for the user"){
            history(`/${userName}`);
          }
      }
    } 
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        
        // backgroundColor: "rgba(255, 255, 255, 0.05)", // Semi-transparent white
        // borderRadius: "10px", // Rounded corners
        // backdropFilter: "blur(5px)", // Creates the frosted glass effect
        // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: adds a subtle shadow
        // border: "1px solid rgba(255, 255, 255, 0.1)",
        p: isAboveMedium && "1rem",
        // m: isLargeScreen ? 0 : 2,
      }}
    >
      {!isAboveMedium && <Typography
        variant="h2"
        sx={{
          color: "#D6DEEF",
          fontSize: "1rem",
          fontWeight: "bold",
          // mb: "2rem",
          position: "-webkit-sticky",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: 'rgba(15,23,42,.75)',
          backdropFilter: "blur(8px)",
          p: '1.25rem 0',
          textTransform: 'uppercase'
        }}
        gutterBottom
      >
        About
      </Typography>}
      <Typography
        variant="body1"
        sx={{
          color: "#8F9DB3",
          fontSize: "1rem",
          lineHeight: "2em",
        }}
        gutterBottom
      >
        {aboutData}
      </Typography>
    </Box>
  );
};

export default About;
