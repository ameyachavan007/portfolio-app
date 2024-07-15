import { InputAdornment, Tooltip, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputTextField } from "../../shared/CustomComponents";

const AboutSectionForm = () => {
    const { control } = useFormContext();
    const theme = useTheme();
    return (
        <Controller
          control={control}
          name="about"
          rules={{ 
            required: "An about section is required",
            maxLength: {
              value: 1000,
              message: "Max character length allowed is 1000",
            }
           }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="Add few paragraphs summarizing your portfolio">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <InputTextField
                        required
                        id="about"
                        label="About"
                        margin="normal"
                        placeholder="Enter few paragraphs summarizing your portfolio..."
                        error={!!error}
                        helperText={error ? error.message : null}
                        fullWidth
                        multiline
                        rows={10}
                        inputProps={{ maxLength: 1000 }}
                        {...field}
                    />
                    <div style={{ marginTop: '4px', alignSelf: 'flex-end', fontSize: '0.875rem', color: field.value.length <= 1000 ? 'rgb(94, 234, 212)' : 'red'}}>
                        {field.value ? `${field.value.length}` : "0"}/1000
                    </div>
                </div>
            </Tooltip>
          )}
        />
    );
  };

  export default AboutSectionForm;