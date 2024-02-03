import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const { userName } = useParams();
  const history = useNavigate();
  // const baseURL = `http://localhost:8080/${userName}/projects`;
  const baseURL = `https://portfolio-server-smoky-six.vercel.app/${userName}/projects`;
  const [projects, setProjects] = useState([]);

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
          border: `1px solid #64FFDA`,
          color: "#64FFDA",
          "& .MuiChip-label": {
            // Target the label specifically
            color: "#64FFDA",
          },
        }}
      />
    ));
  };

  return (
    <Box>
      {projects.map((project, index) => (
        <Box
          key={index}
          sx={{
            mb: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.05)", // Semi-transparent white
            borderRadius: "10px", // Rounded corners
            backdropFilter: "blur(5px)", // Creates the frosted glass effect
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: adds a subtle shadow
            border: "1px solid rgba(255, 255, 255, 0.1)",
            p: "1rem",
            ml: { xs: "0.5rem" },
            mr: { xs: "0.5rem" },
          }}
        >
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#D6DEEF",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    mr: "0.5rem",
                  }}
                  gutterBottom
                >
                  {project.title}
                </Typography>
                <Box
                  sx={{
                    border:
                      project.status === "completed"
                        ? "1px solid  #1eff00"
                        : "1px solid  #FFA500",
                    color:
                      project.status === "completed" ? "#1eff00" : "#FFA500",
                    p: "0.4rem",
                    fontSize: "0.6rem",
                    borderRadius: "30px",
                    display: "flex",
                  }}
                >
                  {project.status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
                </Box>
                <Box sx={{ flex: "1 1 auto" }}></Box>
                <Box>
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
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ color: "#8F9DB3", fontSize: "1rem", mt: "2rem" }}
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
