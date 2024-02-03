import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Stack, Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SocialLinks = () => {
  const history = useNavigate();
  const { userName } = useParams();
  // const baseURL = `http://localhost:8080/${userName}/social-links`;
  const baseURL = `https://portfolio-server-smoky-six.vercel.app/${userName}/social-links`;
  const [sLinks, setSLinks] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(baseURL);
        setSLinks(response.data.socialLinks);
      } catch (error) {
        console.log("Error in fetching about data: ", error);
        if (error.response &&
          error.response.data &&
          error.response.data.error === "Links data not found for the user"){
            history(`/${userName}`);
          }
      }
    } 
    fetchData();
  }, []);

  const getIcon = (key) => {
    switch (key) {
      case "github":
          return <GitHubIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "instagram":
        return <InstagramIcon />;
      case "linkedin":
        return <LinkedInIcon />;
      default:
        break;
    }
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress /> {/* Loading indicator */}
      </Box>
    );
  }

  return (
    <Stack spacing={1} direction="row" sx={{ position: "absolute", bottom: 0 }}>
        {Object.entries(sLinks).map(([key, value]) => (
          value && (
            <IconButton
          key={key}
          style={{ color: "#E2E8F0" }}
          onClick={() => window.open(value, "_blank")}
        >
          {getIcon(key)}
        </IconButton>
          )
        ))}
    </Stack>
  );
}

export default SocialLinks;
