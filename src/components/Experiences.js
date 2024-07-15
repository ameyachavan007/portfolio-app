import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip, useMediaQuery } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate } from "../shared/CustomComponents";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@emotion/react";

const Experiences = () => {
  const { userName } = useParams();
  const history = useNavigate();
  // const baseURL = `http://localhost:8080/${userName}/experiences`;
  const baseURL = `https://portfolio-server-smoky-six.vercel.app/${userName}/experiences`;
  const [experiences, setExperiences] = useState([]);
  const theme = useTheme();
  const isAboveMedium = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(baseURL);
        setExperiences(JSON.parse(response.data.experiences));
      } catch (error) {
        console.log("Error in fetching experiences data: ", error);
        if (error.response &&
          error.response.data &&
          error.response.data.error === "Projects data not found for the user"){
            history(`/${userName}`);
          }
      }
    } 
    fetchData();
  }, []);

  const getSkills = (exp) => {
    const expArray = exp.split(",").map((skill) => skill.trim());
    return expArray.map((exp, index) => (
      <Chip
        key={index}
        label={exp}
        sx={{
          margin: "0.2rem",
          backgroundColor: "rgba(45,212,191,.1)",
          "& .MuiChip-label": {
            // Target the label specifically
            color: "rgb(94 234 212)",
          },
        }}
      />
    ));
  };

  return (
    <Box>
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
        Experience
      </Typography>}
      {experiences.map((exp, index) => (
        <Box
          key={index}
          xs={12}
          sx={{ 
            inset: '4px',
            borderRadius: '0.25rem',
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: 'rgba(39, 43, 52, 0.5)',
              boxShadow: 'inset 0 1px 0 0 rgba(148, 163, 184, 0.1)',
              '&:after': {
                boxShadow: '0 0 0 3px rgba(39, 43, 52, 0.5)', 
              }
            },
            p: isAboveMedium ? 2 : 1,
            mb: 3
           }}
        >
          <div style={{ color: 'white', display: isAboveMedium && 'flex', justifyContent: 'space-between'}}>
            <div style={{ whiteSpace: 'nowrap', margin: '4px 8px 0px 0px' }}>
            <Typography
                  variant="body1"
                  textTransform={'uppercase'}
                  color={'rgb(100 116 139)'}
                  fontSize={!isAboveMedium ? '0.8rem' : '0.75rem'}
                  fontWeight={'600'}
                  lineHeight={'1'}
                  letterSpacing={'0.025rem'}
                  padding={!isAboveMedium && '0.5rem 0rem'}
                >
                  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </Typography>
            </div>
            <div style={ isAboveMedium ? { margin: '0rem 0.5rem' } : {}}>
              <Typography
              variant="body1"
              // className="copmany-position"
                sx={{
                  lineHeight: 1.375,
                  fontWeight: 500,
                  color: 'rgb(226, 232, 240)',
                  textAlign: 'left'
                }}
              >
                {exp.position} · {exp.company}
              </Typography>
              <div style={{ margin: '0px'}}>
             
              <Typography
                sx={{ color: "#8F9DB3", fontSize: "1rem", mt: "1rem" }}
              >
                {exp.responsibilities}
              </Typography>
              </div>
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: "1rem" }}>
                {getSkills(exp.skills)}
              </Box>
            </div>
          </div>
         
        </Box>
      ))}
    </Box>
  );
};

export default Experiences;
