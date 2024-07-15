import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Step,
  Typography,
  Container,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useForm,
  useFormContext,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import axios from "axios";
import {
  GlassyBackground,
  GlassyStepper,
  StepLabels,
  StyledButton,
  InputTextField,
} from "../shared/CustomComponents";
import { useAuth } from "../utils/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonalDetailsForm from "./CareerDetailsForm/PersonalDetailsForm";
import AboutSectionForm from "./CareerDetailsForm/AboutSectionForm.js";
import ProjectSectionForm from "./CareerDetailsForm/ProjectSectionForm.js";
import ExperienceSectionForm from "./CareerDetailsForm/ExperienceSectionForm.js";

const steps = ["Personal Details", "About", "Projects", "Experiences"];
const CareerDetails = () => {
  const history = useNavigate();
  const { login, user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleBackNav = () => {
    history(-1); // Navigate to the previous page
  };

  // form related functions
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      about: "",
      github: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      tagLine: "",
      projects: [
        {
          title: "",
          status: "",
          description: "",
          skills: "",
          projectLink: "",
        },
      ],
      experiences: [
        {
          company: "",
          position: "",
          start_date: "",
          end_date: "",
          skills: "",
          responsibilities: "",
        },
      ],
    },
  });

  

  

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          let response = await axios.get(`https://portfolio-server-smoky-six.vercel.app/${user.username}/career-details`);
          form.reset({
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            about: response.data.user.about,
            experiences: JSON.parse(response.data.user.experiences),
            projects: JSON.parse(response.data.user.projects),
            github: response.data.user.github,
            twitter: response.data.user.twitter,
            linkedin: response.data.user.linkedin,
            instagram: response.data.user.instagram,
            tagLine: response.data.user.tagLine,
          });
        } catch (error) {
          console.log(error)
        }
      }
      fetchData();
      
    }
  }, []);

  const getUpdatedData = (userData, data) => {
    let updatedFields = {};
    for (const key in userData) {
      if (key === "email" || key === "password" || key === "username") {
        continue;
      }
      if (userData[key] !== data[key]) {
        updatedFields[key] = data[key];
      }
    }
    return updatedFields;
  };

 
  const baseURL =
    "https://portfolio-server-smoky-six.vercel.app/career-details";
    // "http://localhost:8080/career-details";
  const handleSubmit = async (data) => {
    let userdata = {
      firstName: user.firstName,
      lastName: user.lastName,
      about: user.about,
      email: user.email,
      experiences: user.experiences ? JSON.parse(user.experiences) : [],
      username: user.username,
      projects: user.projects ? JSON.parse(user.projects) : [],
      github: user.github,
      instagram: user.instagram,
      twitter: user.twitter,
      linkedin: user.linkedin,
      tagLine: user.tagLine,
    }
    const updatedFields = getUpdatedData(userdata, data);

    try {
      const response = await axios.post(baseURL, {
        user: {
          username: user.username.trim().toLowerCase(),
          email: user.email,
          password: user.password,
          ...updatedFields,
        },
      });
      const { updatedUser } = response.data;

      if (updatedUser.firstName && updatedUser.firstName !== "") {
        login(updatedUser);
      }
      history(`/${updatedUser.username}`);
    } catch (err) {
      console.error(
        "Error sending career details to server",
        err.response ? err.response.data : err.message
      );
      setError("Error sending career details to server");
    }
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep === steps.length - 1) {
      form.handleSubmit(handleSubmit)(data);
    } else {
      form.trigger(["firstName", "lastName", "tagLine"]).then((isValid) => {
        if (isValid) setActiveStep((prev) => prev + 1);
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetailsForm />;
      case 1:
        return <AboutSectionForm />;
      case 2:
        return <ProjectSectionForm form={form} />;
      case 3:
        return <ExperienceSectionForm form={form} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <div 
      style={{ 
        backgroundColor: 'rgb(15, 23, 42)', 
        display: 'flex', 
        width: '100%', 
        height: '100vh', 
        overflowY: 'auto', 
        scrollbarWidth: 'none',
      }}
    >
      <div style={{ margin: !isLargeScreen ? "1rem" : "4rem 2rem", width: '100%'}}>
        <header style={{ display: 'flex', margin: !isSmallScreen && '4rem' }}>
          <div>
            {user && (
              <StyledButton
                startIcon={<ArrowBackIcon sx={ !isSmallScreen && { m: '0.5rem' }}/>}
                onClick={handleBackNav}
                
              >
                {isLargeScreen && <Typography
                 sx={{ fontSize: '1rem', mr: '1rem' }}
                >
                  Back to Portfolio
                </Typography>}
              </StyledButton>
            )}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              color: "#D6DEEF",
              fontSize: isLargeScreen ? '1.75rem' : '1.25rem',
              fontWeight: 'bold',
              letterSpacing: '0.025rem',
              textAlign: 'center',
            }}
          >
            Career Details Page
          </Typography>
          </div>
        </header>
        <main style={{ margin: !isSmallScreen && '4rem'}}>
         {/* <Container> */}
          {!isSmallScreen && (<GlassyStepper
            activeStep={activeStep}
            orientation={"horizontal"}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabels>{label}</StepLabels>
              </Step>
            ))}
          </GlassyStepper>)
          }
        <Box
          sx={{
            height: isSmallScreen ? "auto" : "50vh",
            overflowY: "auto",
            width: "auto",
            mt:1,
            height: '100%'
          }}
        >
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
            </div>
          ) : (
            <div style={{ height: '100%' }}>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleNext)} style={{ margin: '2rem 0rem'}}>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <StyledButton
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </StyledButton>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <StyledButton type="submit">
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </StyledButton>
                  </Box>
                </form>
              </FormProvider>
            </div>
          )}
        </Box> 
     {/* </Container> */}
        </main>
      </div>
    </div>
  );
};

export default CareerDetails;
