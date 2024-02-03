import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate } from "../shared/CustomComponents";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Experiences = () => {
  const { userName } = useParams();
  const history = useNavigate();
  // const baseURL = `http://localhost:8080/${userName}/experiences`;
  const baseURL = `https://portfolio-server-smoky-six.vercel.app/${userName}/experiences`;
  const [experiences, setExperiences] = useState([]);

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
      {experiences.map((exp, index) => (
        <Box
          key={index}
          sx={{
            mb: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            p: "1rem",
            ml: { xs: "0.5rem" },
            mr: { xs: "0.5rem" },
          }}
        >
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#D6DEEF",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                  gutterBottom
                >
                  {exp.company}
                </Typography>
                <Box sx={{ flex: "1 1 auto" }}></Box>

                <Typography
                  variant="body1"
                  fontSize={"0.8rem"}
                  justifySelf={"center"}
                  sx={{
                    color: "#60728F",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                  // gutterBottom
                >
                  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                justifySelf={"center"}
                sx={{ color: "#60728F", fontWeight: "bold" }}
              >
                {exp.position}
              </Typography>
              {exp.responsibilities.map(
                (res, index) =>
                  res !== "" && (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <ChevronRightIcon sx={{ color: "#64FFDA", mr: 1 }} />
                      <Typography
                        variant="body1"
                        sx={{ color: "#8F9DB3", fontSize: "1rem" }}
                      >
                        {res}
                      </Typography>
                    </Box>
                  )
              )}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: "1rem" }}>
                {getSkills(exp.skills)}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Experiences;
