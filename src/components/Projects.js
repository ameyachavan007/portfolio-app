import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Chip, useMediaQuery, Tooltip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@emotion/react";
import CircleIcon from '@mui/icons-material/Circle';

const Projects = () => {
  const { userName } = useParams();
  const history = useNavigate();
  // const baseURL = `http://localhost:8080/${userName}/projects`;
  const baseURL = `https://portfolio-server-smoky-six.vercel.app/${userName}/projects`;
  const [projects, setProjects] = useState([]);
  const theme = useTheme();
  const isAboveMedium = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(baseURL);
        setProjects(JSON.parse(response.data.projects));
      } catch (error) {
        console.log("Error in fetching projects data: ", error);
        if (error.response &&
          error.response.data &&
          error.response.data.error === "Projects data not found for the user"){
            history(`/${userName}`);
          }
      }
    } 
    fetchData();
  }, []);

  const getSkills = (skills) => {
    const skilledArray = skills.split(",").map((skill) => skill.trim());
    return skilledArray.map((skill, index) => (
      <Chip
        key={index}
        label={skill}
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
        Projects
      </Typography>}
      {projects.map((project, index) => (
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
          mb: 6
         }}
      >
          <Grid container xs={12}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <div>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#D6DEEF",
                      fontSize: "1rem",
                      mr: "0.5rem",
                    }}
                    gutterBottom
                  >
                    {project.title}
                  </Typography>
                </div>
                {isAboveMedium ? (<div
                  style={{
                    border:
                      project.status === "completed"
                        ? "1px solid  #1eff00"
                        : "1px solid  #FFA500",
                    color:
                      project.status === "completed" ? "#1eff00" : "#FFA500",
                    padding: "0.4rem",
                    fontSize: "0.6rem",
                    borderRadius: "30px",
                    display: "flex",
                  }}
                >
                  {project.status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
                </div>) :
                 (
                  <div>
                    <Tooltip title={project.status === "in-progress" ? "In Progress" : "Completed"}>
                      <CircleIcon 
                        sx={{
                          fontSize: '0.7rem',
                          m:1,
                          color:
                          project.status === "completed" ? "#1eff00" : "#FFA500",
                        }}
                      />
                    </Tooltip>
                  </div>
                 )
                }
                <div style={{ flex: "1 1 auto" }}></div>
                {project.projectLink !== "#" && (
                <div>
                  <a
                    style={{ textDecoration: "underline", fontWeight: "500" }}
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OpenInNewIcon
                      fontSize="medium"
                      sx={{ color: "#64FFDA" }}
                    />
                  </a>
                </div>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ color: "#8F9DB3", fontSize: "1rem", mt: "1rem" }}
              >
                {project.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: "1rem" }}>
                {getSkills(project.skills)}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Projects;
