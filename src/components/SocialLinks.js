import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Stack, Box, CircularProgress } from "@mui/material";

// get links from localstorage and display icons for all avaiable links

const SocialLinks = () => {
  const [githubLink, setGithubLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [sLinks, setSLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const links = [
      { icon: <GitHubIcon />, link: localStorage.getItem("github-link") || "" },
      {
        icon: <InstagramIcon />,
        link: localStorage.getItem("instagram-link") || "",
      },
      {
        icon: <TwitterIcon />,
        link: localStorage.getItem("twitter-link") || "",
      },
      {
        icon: <LinkedInIcon />,
        link: localStorage.getItem("linkedin-link") || "",
      },
    ];

    setSLinks(links.filter((sLink) => sLink.link !== "undefined"));
  }, []);

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
      {sLinks.map((sLink, index) => (
        <IconButton
          key={index}
          style={{ color: "#E2E8F0" }}
          onClick={() => window.open(sLink.link, "_blank")}
        >
          {sLink.icon}
        </IconButton>
      ))}
    </Stack>
  );
};

export default SocialLinks;
