
import { 
    Box,
    Typography,
    Divider,
    Tooltip,
    useMediaQuery,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { InputTextField, StyledButton } from "../../shared/CustomComponents";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";

const ExperienceSectionForm = ({ form }) => {
    const { control } = useFormContext();
    const theme = useTheme();
    const isAboveMedium = useMediaQuery(theme.breakpoints.up('md'));
    const [resumeFile, setResumeFile] = useState(null);

    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience,
      } = useFieldArray({
        control: form.control,
        name: "experiences",
      });

    return (
      <>
        {experienceFields.map((field, index) => (
        //   <GlassyBackground>
            <Box 
                key={field.id}
                sx={{
                    border: '1px solid rgba(214, 222, 239, 0.7)',
                    borderRadius: isAboveMedium ? '1rem' : '0.875rem',
                    m: isAboveMedium ? '1rem 0rem' : '0.875rem 0rem',
                    p: isAboveMedium ? '1rem ' : '0.875rem',
                }} 
            >
              <Typography variant="h6" sx={{ color: "#D6DEEF", fontWeight: 'bold' }}>{`Experience ${
                index + 1
              }`}</Typography>
              <Divider sx={{ bgcolor: "#D6DEEF", mb: "2rem" }} />
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
              <div style={ isAboveMedium ? { display: 'flex', alignItems: 'center' } : {}}>
                <div style={{ marginRight: isAboveMedium && '1rem'}}>
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
                                style: { color: 'white' },
                              }}
                              {...field}
                            />
                          </Tooltip>
                        )}
                    />
                </div>

                <div style={{ marginRight: isAboveMedium && '1rem'}}>
                <Controller
                  control={control}
                  name={`experiences[${index}].end_date`}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter the date when you terminated work for this company">
                      <InputTextField
                        {...field}
                        required={false} // Ensure it's explicitly set to false
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
                      />
                    </Tooltip>
                  )}
                />

                </div>
                
                {/* TODO: New feature for "currently working here" checkbox */}
{/*                 
                <div>
                <Controller
                  control={control}
                  name={`experiences[${index}].cw`}
                  defaultValue={false} // Initial value of checkbox is unchecked
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            if (e.target.checked) {
                                // Clear end date if currently working checkbox is checked
                                form.setValue(`experiences[${index}].end_date`, '');
                            }
                        }}
                          color="primary"
                          sx={{
                            '& .MuiSvgIcon-root': {

                              color: field.value ? 'rgb(94, 234, 212)' : 'rgba(94, 234, 212, 0.7)', // Checked and unchecked color
                            },
                          }}
                        />
                      }
                      label="I currently work here"
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: isAboveMedium ? '1rem' : 'small',
                          color: field.value ? 'rgb(94, 234, 212)' : 'rgba(94, 234, 212, 0.7)', // Label color based on checkbox state
                        },
                      }}
                    />
                  )}
                />
                </div> */}
              </div>

              <Controller
                  control={control}
                  name={`experiences[${index}].responsibilities`}
                  rules={{ 
                        required: "Experience description is required",  
                        maxLength: {
                            value: 400,
                            message: "Max character length allowed is 400",
                          }
                    }}
                  render={({ field, fieldState: { error } }) => (
                    <Tooltip title="Please enter about the work you did in this company...">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <InputTextField
                                required
                                id="responsibilities"
                                label="Responsibilities"
                                margin="normal"
                                error={!!error}
                                helperText={error ? error.message : null}
                                placeholder="Enter a paragraph summarizing your experience..."
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
                    //   sx={{
                    //     "&.MuiSvgIcon-root": {
                    //         col
                    //     }
                    //   }}
                    />
                  </Tooltip>
                )}
              />

              {/* {renderResponsibilities(index)} */}

              {index === 0 ? (
                                <StyledButton onClick={() => removeExperience(index)} disabled>
                                    Remove Experience
                                </StyledButton>
                            ) : (
                                <StyledButton onClick={() => removeExperience(index)}>
                                    Remove Experience
                                </StyledButton>
                )}
            </Box>
        //   </GlassyBackground>
        ))}
        <StyledButton
          onClick={() =>
            appendExperience({
              company: "",
              position: "",
              start_date: "",
              end_date: "",
              responsibilities: ""
            })
          }
        >
          Add Experience
        </StyledButton>
      </>
    );
  };

  export default ExperienceSectionForm;