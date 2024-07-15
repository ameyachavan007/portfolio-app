
import { 
    Box,
    Typography,
    Divider,
    Tooltip,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    useMediaQuery,
    InputAdornment,


} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { InputTextField, StyledButton } from "../../shared/CustomComponents";
import { useTheme } from "@emotion/react";



const ProjectSectionForm = ({ form }) => {
    const { control, watch } = useFormContext();
    const theme = useTheme();
    const isAboveMedium = useMediaQuery(theme.breakpoints.up('md'));

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

    const {
        fields: projectFields,
        append: appendProject,
        remove: removeProject,
      } = useFieldArray({
        control: form.control,
        name: "projects",
      });

    return (
      <Box>
        {projectFields.map((field, index) => {
          const statusValue = watch(`projects[${index}].status`);
          return (
            // <GlassyBackground>
              <Box 
                    key={field.id}
                    sx={{
                        border: '1px solid rgba(214, 222, 239, 0.7)',
                        borderRadius: isAboveMedium ? '1rem' : '0.875rem',
                        m: isAboveMedium ? '1rem 0rem' : '0.875rem 0rem',
                        p: isAboveMedium ? '1rem ' : '0.875rem',
                    }} 

                >
                <Typography variant="h6" sx={{ color: "#D6DEEF", fontWeight: 'bold' }}>{`Project ${
                  index + 1
                }`}</Typography>
                <Divider sx={{ bgcolor: "#D6DEEF", mb: "2rem" }} />
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
                            color: "rgba(45,212,191,.6)",
                          },
                          "& legend": {
                            color: "rgba(45,212,191,.6)",
                          },
                          display: 'block',
                          m: '0rem 0.5rem'
                        }}
                      >
                        <FormLabel component="legend" sx={{ color: "#a4a4a4", fontSize: isAboveMedium ? "0.75rem" : "0.65rem" }}>
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
                                    color: "rgb(94 234 212)",
                                  },
                                }}
                              />
                            }
                            label="In-Progress"
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: isAboveMedium ? "1rem" : "0.875rem",
                                color:
                                  statusValue === "in-progress"
                                    ? "rgb(94 234 212)"
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
                                    color: "rgb(94 234 212)",
                                  },
                                }}
                              />
                            }
                            label="Completed"
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: isAboveMedium ? "1rem" : "0.875rem",
                                color:
                                  statusValue === "completed"
                                    ? "rgb(94 234 212)"
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
                  rules={{ 
                        required: "Project description is required",  
                        maxLength: {
                            value: 400,
                            message: "Max character length allowed is 400",
                          }
                    }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter a description for your project">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <InputTextField
                                required
                                id="description"
                                label="Description"
                                margin="normal"
                                error={!!error}
                                helperText={error ? error.message : null}
                                placeholder="Enter a paragraph summarizing your project..."
                                fullWidth
                                multiline
                                rows={4}
                                {...field}
                            />
                            <div style={{ marginTop: '4px', alignSelf: 'flex-end', fontSize: '0.875rem', color: field.value.length <= 400 ? 'rgb(94, 234, 212)' : 'red'}}>
                                {field.value ? `${field.value.length}` : "0"}/400
                            </div>
                        </div>
                    </Tooltip>
                  )}
                />

                <Controller
                  control={control}
                  name={`projects[${index}].projectLink`}
                  rules={{
                    validate: (value) =>
                      value === "" || isValidURL(value) || "Enter a valid project URL",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter a link for your project">
                      <InputTextField
                        label="Project Link"
                        placeholder="Enter the link to your project...if N/A then enter '#'"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error ? error.message : null}
                       
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

                {index === 0 ? (
                                <StyledButton onClick={() => removeProject(index)} disabled>
                                    Remove Project
                                </StyledButton>
                            ) : (
                                <StyledButton onClick={() => removeProject(index)}>
                                    Remove Project
                                </StyledButton>
                )}
              </Box>
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

  export default ProjectSectionForm;