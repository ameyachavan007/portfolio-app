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
import { borderRadius } from "@mui/system";

export const formatDate = (dateString) => {
  if (dateString === "" || dateString === null || dateString === undefined) {
    return "Present";
  }
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
    color: "rgba(45,212,191,.6)", 
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
  display: 'block',

  "& textarea": {
    color: "#D6DEEF",
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.875rem",
    },
  },
 
  "& label": {
    color: "rgba(45,212,191,.6)",
  },
  "&:hover label": {
    color: "rgb(94 234 212)",
  },
  "& label.Mui-focused": {
    color: "rgb(94 234 212)",
  },
  "& .MuiOutlinedInput-root": {
    "& input": {
      color: "#D6DEEF",
      
    },
    "& fieldset": {
      border: '1px solid rgba(45,212,191,.1)',
      borderRadius: '1rem'
    },
    "&:hover fieldset": {
      borderColor: "rgba(45,212,191,.7)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(45,212,191,.7)",
    },
  },
  '& input[type="date"]::-webkit-calendar-picker-indicator' :  {
    cursor: 'pointer',
    filter: 'invert(1)'
  },
  [theme.breakpoints.down('sm')]: {
    "& label": {
      fontSize: '0.875rem',
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        fontSize: '0.875rem'
        
      },
    } 
  }
}));

// Custom Styled StepLabel Component
export const StepLabels = styled(StepLabel)(({ theme }) => ({
  // fontSize: '2rem',
  "& .MuiStepLabel-label.Mui-active": {
    color: "white",
  },

  "& .MuiStepLabel-label": {
    color: "#a4a4a4",
    fontSize: '1rem'
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: "rgb(94 234 212)",
  },
  "& .MuiStepLabel-iconContainer": {
    "& svg": {
      color: 'rgba(45,212,191,.1)'  
    }   
  },
  "& .MuiStepLabel-iconContainer.Mui-completed": {
     "& svg": {
        color: 'rgb(94 234 212)'  
     }
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
  padding: '1rem',
  border: '1px solid rgba(45,212,191,.5)',
  borderRadius: '1rem',
  '& .MuiStepConnector-root': {
    '& .MuiStepConnector-line': {
      borderColor: 'transparent',
      width: 0
    },
  },
  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
    borderColor: 'rgb(94, 234, 212)',
    width: '100%'
  },
  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
    borderColor: 'rgb(94, 234, 212)',
    width: '100%',
    transition: 'width 0.5s ease-in-out',
  },
  '& .MuiStepConnector-root.Mui-disabled .MuiStepConnector-line': {
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
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

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(45,212,191,.1)',
  color: 'rgb(94 234 212)',
  textTransform: "none",
  borderRadius: '1rem',
  '& span': {
    margin: 0,
    padding: 0
  },
  [theme.breakpoints.down('sm')]: { 
      fontSize: '0.75rem',

  }
}));
