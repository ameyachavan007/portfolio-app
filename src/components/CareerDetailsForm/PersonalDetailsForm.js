import React from "react";
import {
  Box,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import {
  useFormContext,
  Controller,
} from "react-hook-form";
import {
  InputTextField,
} from "../../shared/CustomComponents";
import { useTheme } from "@emotion/react";


const PersonalDetailsForm = () => {
    const theme = useTheme();
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
    
    const { control } = useFormContext();


    return (

        <div style={{ width: '100%' }}>
             <Box sx={{ }}>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First name is required" }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="First name is required.">
              <InputTextField 
                id="first-name"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                error={ !!error }
                helperText={error ? error.message : null}
                { ...field }
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
                fullWidth
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
                  maxLength: 80,
                  endAdornment: (
                    <InputAdornment position="end"
                     sx={{ 
                        color: "rgb(94 234 212)",
                        fontSize: theme.breakpoints.down('xs') ? '0.875rem' : '1rem', 
                    }}
                    >
                      {field.value ? `${field.value.length}` : "0"}/80
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 80, 
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
      </Box>
        </div>
   
    );
  };

export default PersonalDetailsForm
