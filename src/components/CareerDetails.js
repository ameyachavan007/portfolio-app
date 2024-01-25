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
import { useDispatch, useSelector } from "react-redux";
import { setAllDetails } from "../redux/userSlice";
import { useAuth } from "../utils/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const steps = ["Personal Details", "About", "Projects", "Experiences"];
const CareerDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { login, user } = useAuth();
  const userDataRedux = useSelector((state) => state.userData);
  const emailRedux = useSelector((state) => state.userData.email);
  const passwordRedux = useSelector((state) => state.userData.password);
  const usernameRedux = useSelector((state) => state.userData.username);
  const firstNameRedux = useSelector((state) => state.userData.firstName);
  const lastNameRedux = useSelector((state) => state.userData.lastName);
  const aboutRedux = useSelector((state) => state.userData.about);
  const experiencesRedux = useSelector((state) => state.userData.experiences);
  const projectsRedux = useSelector((state) => state.userData.projects);
  const githubRedux = useSelector((state) => state.userData.github);
  const instaRedux = useSelector((state) => state.userData.instagram);
  const linkedinRedux = useSelector((state) => state.userData.linkedin);
  const twitterRedux = useSelector((state) => state.userData.twitter);
  const tagRedux = useSelector((state) => state.userData.tagLine);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
          responsibilities: [],
        },
      ],
    },
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  useEffect(() => {
    if (!usernameRedux || usernameRedux !== "") {
      form.reset({
        firstName: firstNameRedux,
        lastName: lastNameRedux,
        about: aboutRedux,
        experiences: JSON.parse(experiencesRedux),
        projects: JSON.parse(projectsRedux),
        github: githubRedux,
        twitter: twitterRedux,
        linkedin: linkedinRedux,
        instagram: instaRedux,
        tagLine: tagRedux,
      });
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
  const handleSubmit = async (data) => {
    const updatedFields = getUpdatedData(userDataRedux, data);
    try {
      const response = await axios.post(baseURL, {
        user: {
          username: usernameRedux,
          email: emailRedux,
          password: passwordRedux,
          ...updatedFields,
        },
      });
      const { firstName, lastName, about, experiences } = response.data.user;
      dispatch(
        setAllDetails({
          firstName,
          lastName,
          about,
          experiences,
          usernameRedux,
          emailRedux,
          passwordRedux,
        })
      );
      localStorage.setItem("username", usernameRedux);
      localStorage.setItem("first-name", firstName);
      localStorage.setItem("last-name", lastName);
      localStorage.setItem("about", about);
      localStorage.setItem("all-experiences", experiences);

      if (firstName || firstName !== "") {
        login({ firstName: firstName });
      }
      history(`/${usernameRedux}`);
    } catch (err) {
      console.error(
        "Error sending career details to server",
        err.response ? err.response.data : err.message
      );
      setError("Error sending career details to server");
    }
  };

  const isValidURL = (url) => {
    if (!url) return true; // Allow empty input
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };

  const handleNext = (data) => {
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
        return <ProjectsForm />;
      case 3:
        return <ExperiencesForm />;
      default:
        return "Unknown step";
    }
  };

  // form step 1
  const PersonalDetailsForm = () => {
    const { control } = useFormContext();
    return (
      <GlassyBackground>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First name is required" }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="First name is required.">
              <InputTextField
                id="first-name"
                label="First Name"
                margin="normal"
                required
                placeholder="Enter your first name..."
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                InputProps={{
                  style: { color: "white" },
                }}
                {...field}
              />
            </Tooltip>
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Last name is required" }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Last name is required.">
              <InputTextField
                id="last-name"
                label="Last Name"
                margin="normal"
                required
                error={!!error}
                helperText={error ? error.message : null}
                placeholder="Enter your last name..."
                fullWidth
                InputProps={{
                  style: { color: "white" },
                }}
                {...field}
              />
            </Tooltip>
          )}
        />
        <Controller
          control={control}
          name="tagLine"
          rules={{
            required: "Tag line is required",
            maxLength: {
              value: 80,
              message: "Tag line should be a single line and not too long",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Tag line is required and should be a single line not exceeding 80 characters.">
              <InputTextField
                id="tag-line"
                label="Tag Line"
                required
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                placeholder="Describe yourself in one line..."
                fullWidth
                InputProps={{
                  style: { color: "white" },
                  maxLength: 80,
                  endAdornment: (
                    <InputAdornment position="end" sx={{ color: "white" }}>
                      {field.value ? `${field.value.length}` : "0"}/80
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 80, // This will prevent the user from entering more than 80 characters
                }}
                {...field}
              />
            </Tooltip>
          )}
        />
        <Controller
          control={control}
          name="github"
          rules={{
            validate: (value) =>
              value === "" || isValidURL(value) || "Enter a valid URL",
          }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Enter your GitHub profile link (must be a valid URL).">
              <InputTextField
                label="GitHub"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                placeholder="Enter your GitHub profile link..."
                fullWidth
                InputProps={{ style: { color: "white" } }}
                {...field}
              />{" "}
            </Tooltip>
          )}
        />
        <Controller
          control={control}
          name="instagram"
          rules={{
            validate: (value) =>
              value === "" || isValidURL(value) || "Enter a valid URL",
          }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Enter your Instagram profile link (must be a valid URL).">
              <InputTextField
                label="Instagram"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                placeholder="Enter your Instagram profile link..."
                fullWidth
                InputProps={{ style: { color: "white" } }}
                {...field}
              />
            </Tooltip>
          )}
        />
        <Controller
          control={control}
          name="twitter"
          rules={{
            validate: (value) =>
              value === "" || isValidURL(value) || "Enter a valid URL",
          }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Enter your Twitter profile link (must be a valid URL).">
              <InputTextField
                label="Twitter"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                placeholder="Enter your Twitter profile link..."
                fullWidth
                InputProps={{ style: { color: "white" } }}
                {...field}
              />
            </Tooltip>
          )}
        />
        <Controller
          control={control}
          name="linkedin"
          rules={{
            validate: (value) =>
              value === "" || isValidURL(value) || "Enter a valid URL",
          }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Enter your LinkedIn profile link (must be a valid URL).">
              <InputTextField
                label="LinkedIn"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                placeholder="Enter your LinkedIn profile link..."
                fullWidth
                InputProps={{ style: { color: "white" } }}
                {...field}
              />
            </Tooltip>
          )}
        />
      </GlassyBackground>
    );
  };

  // form step 2
  const AboutSectionForm = () => {
    const { control } = useFormContext();
    return (
      <GlassyBackground>
        <Controller
          control={control}
          name="about"
          rules={{ required: "An about section is required" }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Add few paragraphs summarizing your portfolio">
              <InputTextField
                required
                id="about"
                label="About"
                margin="normal"
                placeholder="Enter few paragraph summarizing your portfolio..."
                InputProps={{
                  style: { color: "white" },
                }}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                multiline
                rows={4}
                {...field}
              />
            </Tooltip>
          )}
        />
      </GlassyBackground>
    );
  };

  // form step 3

  const ProjectsForm = () => {
    const { control, watch } = useFormContext();
    return (
      <Box>
        {projectFields.map((field, index) => {
          const statusValue = watch(`projects[${index}].status`);
          return (
            <GlassyBackground>
              <Box key={field.id}>
                <Typography variant="h6" sx={{ color: "#64FFDA" }}>{`Project ${
                  index + 1
                }`}</Typography>
                <Divider sx={{ bgcolor: "#64FFDA", mb: "1rem" }} />
                <Controller
                  control={control}
                  name={`projects[${index}].title`}
                  rules={{ required: "Project title is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter a title for your project">
                      <InputTextField
                        required
                        label="Title"
                        id="title"
                        margin="normal"
                        error={!!error}
                        helperText={error ? error.message : null}
                        placeholder="Enter the project name..."
                        fullWidth
                        InputProps={{
                          style: { color: "white" },
                        }}
                        {...field}
                      />
                    </Tooltip>
                  )}
                />

                <Controller
                  control={control}
                  name={`projects[${index}].status`}
                  rules={{ required: "Project status is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter the current status of your project">
                      <FormControl
                        required
                        component="fieldset"
                        error={!!error}
                        helperText={error ? error.message : null}
                        fullWidth
                        margin="normal"
                        sx={{
                          "&:focus-within legend": {
                            color: "white",
                          },
                          "& legend": {
                            color: "#a4a4a4",
                          },
                        }}
                      >
                        <FormLabel component="legend" sx={{ color: "#a4a4a4" }}>
                          Status
                        </FormLabel>
                        <RadioGroup row {...field}>
                          <FormControlLabel
                            value="in-progress"
                            control={
                              <Radio
                                sx={{
                                  color: "#a4a4a4", // Default and checked color
                                  "&.Mui-checked": {
                                    color: "#007bff",
                                  },
                                }}
                              />
                            }
                            label="In-Progress"
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                color:
                                  statusValue === "in-progress"
                                    ? "#007bff"
                                    : "#a4a4a4",
                              },
                            }}
                          />
                          <FormControlLabel
                            value="completed"
                            control={
                              <Radio
                                sx={{
                                  color: "#a4a4a4", // Default and checked color
                                  "&.Mui-checked": {
                                    color: "#007bff",
                                  },
                                }}
                              />
                            }
                            label="Completed"
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                color:
                                  statusValue === "completed"
                                    ? "#007bff"
                                    : "#a4a4a4",
                              },
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Tooltip>
                  )}
                />

                <Controller
                  control={control}
                  name={`projects[${index}].description`}
                  rules={{ required: "Project description is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter a description for your project">
                      <InputTextField
                        required
                        id="description"
                        label="Description"
                        margin="normal"
                        error={!!error}
                        helperText={error ? error.message : null}
                        placeholder="Enter a paragraph summarizing your project..."
                        InputProps={{
                          style: { color: "white" },
                        }}
                        fullWidth
                        multiline
                        rows={4}
                        {...field}
                      />
                    </Tooltip>
                  )}
                />
                <Controller
                  control={control}
                  name={`projects[${index}].projectLink`}
                  rules={{ required: "Project link is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter a link for your project">
                      <InputTextField
                        label="Project Link"
                        placeholder="Enter the link to your project..."
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{ style: { color: "white" } }}
                        {...field}
                      />
                    </Tooltip>
                  )}
                />
                <Controller
                  control={control}
                  name={`projects[${index}].skills`}
                  rules={{ required: "Project skills are required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter the skills developed by your project">
                      <InputTextField
                        required
                        id="skills"
                        label="Skills"
                        margin="normal"
                        error={!!error}
                        helperText={error ? error.message : null}
                        placeholder="List all relevant skills for this project, separated by commas. For example, ReactJS, NodeJS, and so on..."
                        InputProps={{
                          style: { color: "white" },
                        }}
                        fullWidth
                        multiline
                        rows={2}
                        {...field}
                      />
                    </Tooltip>
                  )}
                />

                <StyledButton onClick={() => removeProject(index)}>
                  Remove Project
                </StyledButton>
              </Box>
            </GlassyBackground>
          );
        })}
        <StyledButton
          onClick={() =>
            appendProject({
              title: "",
              status: "",
              description: "",
              skills: "",
            })
          }
        >
          Add Project
        </StyledButton>
      </Box>
    );
  };

  // form step 4

  const ExperiencesForm = () => {
    const { control } = useFormContext();
    const renderResponsibilities = (index) => {
      return Array.from({ length: 4 }).map((_, respIndex) => (
        <Controller
          key={respIndex}
          control={control}
          name={`experiences[${index}].responsibilities[${respIndex}]`}
          rules={respIndex < 2 ? { required: "This field is required" } : {}}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Please enter responsibility for this work experience">
              <InputTextField
                label={`Responsibility ${respIndex + 1}`}
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                placeholder={`Enter responsibility #${respIndex + 1}`}
                fullWidth
                InputProps={{ style: { color: "white" } }}
                {...field}
              />
            </Tooltip>
          )}
        />
      ));
    };
    return (
      <>
        {experienceFields.map((field, index) => (
          <GlassyBackground>
            <Box key={field.id}>
              <Typography variant="h6" sx={{ color: "#64FFDA" }}>{`Experience ${
                index + 1
              }`}</Typography>
              <Divider sx={{ bgcolor: "#64FFDA", mb: "1rem" }} />
              <Controller
                control={control}
                rules={{ required: "Company name is required" }}
                name={`experiences[${index}].company`}
                render={({ field, fieldState: { error } }) => (
                  <Tooltip title="Please enter name of the company for this work experience">
                    <InputTextField
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                      label="Company"
                      margin="normal"
                      placeholder="Enter the company name..."
                      fullWidth
                      InputProps={{
                        style: { color: "white" },
                      }}
                      {...field}
                    />
                  </Tooltip>
                )}
              />
              <Controller
                control={control}
                rules={{ required: "Your role in the company is required" }}
                name={`experiences[${index}].position`}
                render={({ field, fieldState: { error } }) => (
                  <Tooltip title="Please enter your role in the company">
                    <InputTextField
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                      label="Position"
                      margin="normal"
                      placeholder="Enter the position title..."
                      fullWidth
                      InputProps={{
                        style: { color: "white" },
                      }}
                      {...field}
                    />
                  </Tooltip>
                )}
              />
              <Controller
                control={control}
                rules={{ required: "Start date is required" }}
                name={`experiences[${index}].start_date`}
                render={({ field, fieldState: { error } }) => (
                  <Tooltip title="Please enter the date when you started working for this company">
                    <InputTextField
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="date"
                      id="start_date"
                      label="Start Date"
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      InputProps={{
                        style: { color: "white" },
                      }}
                      {...field}
                    />
                  </Tooltip>
                )}
              />
              <Controller
                control={control}
                rules={{ required: "End date is required" }}
                name={`experiences[${index}].end_date`}
                render={({ field, fieldState: { error } }) => (
                  <Tooltip title="Please enter the date when you terminated work for this company">
                    <InputTextField
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="date"
                      id="end_date"
                      label="End Date"
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      InputProps={{
                        style: { color: "white" },
                      }}
                      {...field}
                    />
                  </Tooltip>
                )}
              />
              <Controller
                control={control}
                rules={{
                  required:
                    "Technology stack for this work experience is required",
                }}
                name={`experiences[${index}].skills`}
                render={({ field, fieldState: { error } }) => (
                  <Tooltip title="Please enter the technology stack for this work experience">
                    <InputTextField
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                      id="skills"
                      label="Skills"
                      margin="normal"
                      placeholder="List all relevant skills for this experience, separated by commas. For example, ReactJS, NodeJS, and so on..."
                      InputProps={{
                        style: { color: "white" },
                      }}
                      fullWidth
                      multiline
                      rows={2}
                      {...field}
                    />
                  </Tooltip>
                )}
              />

              {renderResponsibilities(index)}

              <StyledButton onClick={() => removeExperience(index)}>
                Remove Experience
              </StyledButton>
            </Box>
          </GlassyBackground>
        ))}
        <StyledButton
          onClick={() =>
            appendExperience({
              company: "",
              position: "",
              start_date: "",
              end_date: "",
              responsibilities: ["", "", "", ""], // Array for up to 4 responsibilities
            })
          }
        >
          Add Experience
        </StyledButton>
      </>
    );
  };

  return (
    <Box
      sx={{
        height: isSmallScreen ? "100%" : "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        scrollbarWidth: "0",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isSmallScreen ? "space-between" : "center",
          // position: "relative",
          mb: isSmallScreen ? 2 : 5,
          mt: isSmallScreen ? 2 : 5,
        }}
      >
        {user && (
          <StyledButton
            startIcon={<ArrowBackIcon />}
            onClick={handleBackNav}
            sx={{
              position: "absolute",
              left: "10%",
              top: isSmallScreen ? "1%" : "15%",
              transform: "translateX(-50%)",
              display: isSmallScreen ? "icon" : "flex",
              borderRadius: isSmallScreen ? "999999px" : "10px",
              fontSize: "0.8rem",
            }}
          >
            {!isSmallScreen && "Back"}
          </StyledButton>
        )}

        <Typography
          variant="h4"
          sx={{
            color: "white",
            mb: isSmallScreen ? 2 : 5,
            fontSize: isSmallScreen ? "1rem" : "2.125rem",
            pl: isSmallScreen ? 6 : 0,
          }}
        >
          Career Details Page
        </Typography>
      </Box>
      {error && (
        <div className="error" style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </div>
      )}
      <Container>
        <GlassyStepper
          activeStep={activeStep}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabels>{label}</StepLabels>
            </Step>
          ))}
        </GlassyStepper>
        <Box
          sx={{
            height: isSmallScreen ? "auto" : "50vh",
            overflowY: "auto",
            width: "auto",
          }}
        >
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
            </div>
          ) : (
            <div>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleNext)}>
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
      </Container>
    </Box>
  );
};

export default CareerDetails;
