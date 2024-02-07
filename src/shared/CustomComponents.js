import styled from "@emotion/styled";
import {
  Stepper,
  StepLabel,
  Button,
  TextField,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  FormControlLabel,
} from "@mui/material";

export const formatDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${year}`;
};

// Custom Styled Radio Component
export const StyledRadio = styled(Radio)({
  color: "#a4a4a4", // Default color
  "&.Mui-focused": {
    color: "#a4a4a4", // Color when checked
  },
});

// Custom Styled FormControlLabel Component
export const StyledFormControlLabel = styled(FormControlLabel)({
  "& .MuiFormLabel-label": {
    color: "#a4a4a4", // Label color
  },
  "&.Mui-focused": {
    color: "#a4a4a4", // Color when checked
  },
});

// Custom Styled Select Component
export const StyledSelect = styled(Select)({
  "& .MuiOutlinedInput-root ": {
    border: "1px solid #a4a4a4",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a4a4a4",
    },
  },
});

// Custom Styled FormControl Component
export const StyledFormControl = styled(FormControl)({
  width: "100%", // Assuming you want it full width
  margin: "normal",
});

// Custom Styled InputLabel Component
export const StyledInputLabel = styled(InputLabel)({
  "&": {
    color: "#a4a4a4",
  },
  "&.Mui-focused": {
    color: "white",
  },
});

export const InputTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "#a4a4a4",
  },
  "&:hover label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#a4a4a4",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  // Responsive styles
  [theme.breakpoints.down("xs")]: {
    width: "100%", // Full width on extra small devices
    "& .MuiInputBase-input": {
      fontSize: "0.875rem", // Smaller font size on extra small devices
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.875rem", // Smaller label size
    },
  },
}));

// Custom Styled StepLabel Component
export const StepLabels = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label.Mui-active": {
    color: "white",
  },
  "& .MuiStepLabel-label": {
    color: "#a4a4a4",
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: "white",
  },
  // Responsive styles
  [theme.breakpoints.down("xs")]: {
    "& .MuiStepLabel-label": {
      // Target the labels
      fontSize: "0.75rem", // Smaller font size for labels
    },
  },
}));

// Custom Styled Stepper Component
export const GlassyStepper = styled(Stepper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "10px",
  padding: "10px",
  // margin: "1rem",
  width: "auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  // // Responsive styles
  // [theme.breakpoints.down("xs")]: {
  //   flexDirection: "column",
  //   p: "5px",
  //   "& .MuiStepIcon-root": {
  //     width: "20px",
  //     height: "20px",
  //   },
  //   "& .MuiSvgIcon-root": {
  //     fontSize: "1rem",
  //   },
  //   "& .MuiStepIcon-root": {
  //     fontSize: "1rem",
  //   },
  //   "& .MuiStepLabel-label": {
  //     fontSize: "0.75rem",
  //   },
  // },
}));

export const GlassyBackground = styled(Box)({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "10px",
  padding: "20px",
  margin: "10px 0",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: 'hidden',
});

export const StyledButton = styled(Button)({
  backgroundColor: "#007bff", // Example color
  color: "white",
  "&:hover": {
    backgroundColor: "#0056b3", // Darker shade on hover
  },
  margin: "10px",
});
