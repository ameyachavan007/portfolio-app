import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Modal, CircularProgress } from "@mui/material";
import Navbar from "./Navbar";
import SocialLinks from "./SocialLinks";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const UserPage = () => {
  const { userName } = useParams();
  const history = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const url = `http://localhost:8080/${userName}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://portfolio-server-smoky-six.vercel.app/${userName}`;
        const response = await axios.get(url);
        const {
          firstName,
          lastName,
          tagLine,
        } = response.data.user;

        // Set states
        setFirstName(firstName);
        setLastName(lastName);
        setTag(tagLine);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setModalOpen(true);
        setTimeout(() => {
          history("/login");
        }, 5000);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
    <Box
      component="div"
      sx={{ height: "100%", }}
      display={"flex"}
      justifyContent={"center"}
    >
      <Grid container lg={8}>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
              Redirecting to Career Details
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              We do not have your details to build your portfolio, redirecting
              you to career details page.
            </Typography>
          </Box>
        </Modal>
        <Grid item container lg={5} sx={{ mt: "5rem", mb: "5rem" }}>
          <Grid
            item
            xs={12}
            sx={{ ml: { xs: "0.5rem" }, mr: { xs: "0.5rem" } }}
          >
            <Typography
              variant="h3"
              sx={{ color: "#D6DEEF", fontWeight: "bold" }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ color: "#8F9DB3", mt: "1rem" }}
            >
              {tag}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              mt: { xs: "2rem" },
              mb: { xs: "2.5rem" },
              ml: { xs: "0.5rem" },
            }}
          >
            <Navbar />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ position: "relative", mt: { xs: "2.5rem" } }}
          >
            <SocialLinks />
          </Grid>
        </Grid>
        <Grid
          item
          container
          lg={7}
          sx={{
            mt: "5rem",
            mb: "5rem",
            height: "calc(100vh - 10rem)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            scrollbarWidth: "none", // For Firefox
          }}
        >
          <Grid item>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPage;
