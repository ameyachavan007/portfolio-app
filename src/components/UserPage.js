import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, Box, Modal, CircularProgress, useMediaQuery, Container } from "@mui/material";
import Navbar from "./Navbar";
import SocialLinks from "./SocialLinks";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";
import UserPI from "./UserPI";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";

const UserPage = () => {
  const theme = useTheme();
  const isAboveMedium = useMediaQuery("(min-width: 1025px)");
  const { userName } = useParams();
  const history = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const url = `http://localhost:8080/${userName}`;

  // Refs for sections
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experiencesRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
    // <Container padding={0} margin={0} overflow={'hidden'}>
    <Box
      component="div"
      sx={{ padding: !isAboveMedium && '0.5rem' }}
      display={"flex"}
      justifyContent={"center"}
    >
    <Grid container lg={10} spacing={8}>
    <Grid item xs={12} lg={5} >
      <Box component={'div'} sx={{ display: 'flex', flexDirection: 'column', justifyContent: isAboveMedium && 'space-between', height: isAboveMedium ? '100vh' : 'auto', }}>
        <Box component={'div'} sx={{ display: 'flex', color: 'white', flexDirection: 'column', padding: isAboveMedium && '1rem', margin: isAboveMedium ? '4rem' : '0.5rem'}}>
          <UserPI firstName={firstName} lastName={lastName} tag={tag}/>
            <div style={{ marginTop: '4rem' }}>
            <Navbar
                  aboutRef={aboutRef}
                  projectsRef={projectsRef}
                  experiencesRef={experiencesRef}
                  scrollToSection={scrollToSection}
                />
            </div>
        </Box>
        <Box component={'div'} sx={{ display:'flex', padding: isAboveMedium && '1rem', margin: isAboveMedium ? '4rem' : '0.5rem'}}>
          <SocialLinks/>
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12} lg={7}>
      <div>
        <div 
          style={ 
            isAboveMedium ? {
            maxHeight: '100vh', 
            overflowY: 'auto',   
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',   
            margin: "4rem 0rem"
          } : {margin: "0.5rem"}}
        >
          <section id="about" ref={aboutRef} style={{ marginBottom: '4rem'}}>
            <About/>
          </section>
          <section id="experiences" ref={experiencesRef} style={{ marginBottom: '4rem'}}>
            <Experiences/>
          </section>
          <section id="projects" ref={projectsRef}>
            <Projects/>
          </section>
        </div>
      </div>
    </Grid>
  </Grid>
  {/* </Container> */}
  </Box>
  );
};

export default UserPage;
