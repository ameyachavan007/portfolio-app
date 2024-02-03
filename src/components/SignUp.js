import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { InputTextField, StyledButton } from "../shared/CustomComponents";
import { useAuth } from "../utils/auth";
import { useDispatch } from "react-redux";
import { setAllDetails } from "../redux/userSlice";
import Tooltip from "@mui/material/Tooltip";
import CryptoJS from "crypto-js";
import { GlassyBackground } from "../shared/CustomComponents";

const SignUp = () => {
  const history = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  // const baseURL = "https://portfolio-server-smoky-six.vercel.app";
  const baseURL = "http://localhost:8080";
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const isValidUsername = (username) => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidPassword = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const handleSubmit = async (event) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    event.preventDefault();

    if (!isValidUsername(username)) {
      setError(
        "Invalid username. Use 3-20 characters and avoid special symbols."
      );
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters.");
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/signup`, {
        email,
        username,
      });
      const { message } = response.data;
      if (message === "SignUp successful") {
        
        login({username: username, email: email, password: password});
      }
      history("/career-details");
    } catch (error) {
      console.error(error);
      // Check if the error is due to user not found
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "User already exists"
      ) {
        setError("User already exists exists. Redirecting to login...");
        // Redirect to signup page after a delay
        setTimeout(() => {
          history("/");
        }, 2000); // 2 seconds delay
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Username already exists"
      ) {
        setUsername("");
        setEmail("");
        setPassword("");
        setError("Username already exists, please try a different username...");
      } else {
        // Handle other errors
        setError("An error occurred. Please try again.");
      }
    }
  };

  const formStyle = {
    width: "100%",
    maxWidth: isLargeScreen ? "800px" : "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 350px)": {
      padding: "0.5rem",
      "& .MuiTextField-root": {
        margin: "8px 0",
      },
      "& .MuiButton-root": {
        padding: "8px",
      },
      "& .MuiTypography-h4": {
        fontSize: "1.25rem",
      },
    },
    "@media (max-width: 320px)": {
      "& .MuiTextField-root": {
        margin: "8px 0",
      },
      "& .MuiButton-root": {
        padding: "8px",
      },
      "& .MuiTypography-h4": {
        fontSize: "1.25rem",
      },
    },
  };
  return (
    <>
      <Box
        sx={{
          height: isSmallScreen ? "800px" : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container xs={10} sm={8} md={6} lg={4} direction={"column"}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                mb: "5rem",
                textAlign: "center",
              }}
            >
              SignUp Page
            </Typography>
          </Grid>
          <Grid item>
            {error && (
              <div
                className="error"
                style={{ color: "red", marginBottom: "1rem" }}
              >
                {JSON.stringify(error)}
              </div>
            )}
            <GlassyBackground>
              <form action="POST" style={formStyle}>
                <Tooltip title="Choose a unique username. Only letters, numbers, and underscores are allowed.">
                  <InputTextField
                    type="text"
                    value={username}
                    label="Username"
                    onChange={usernameChangeHandler}
                    margin="normal"
                    placeholder="Enter your username here..."
                    InputProps={{
                      style: { color: "white" },
                    }}
                    fullWidth
                  />
                </Tooltip>
                <Tooltip title="Enter a valid email address.">
                  <InputTextField
                    type="email"
                    value={email}
                    label="Email"
                    onChange={emailChangeHandler}
                    margin="normal"
                    placeholder="Enter your email here..."
                    InputProps={{
                      style: { color: "white" },
                    }}
                    fullWidth
                  />
                </Tooltip>
                <Tooltip title="Password should be at least 8 characters long.">
                  <InputTextField
                    type="password"
                    value={password}
                    label="Password"
                    onChange={passwordChangeHandler}
                    margin="normal"
                    placeholder="Enter your password here..."
                    InputProps={{
                      style: { color: "white" },
                    }}
                    fullWidth
                  />
                </Tooltip>
                <Tooltip title="Re-enter your password to confirm.">
                  <InputTextField
                    type="password"
                    value={confirmPassword}
                    label="Confirm Password"
                    onChange={confirmPasswordChangeHandler}
                    margin="normal"
                    placeholder="Confirm your password..."
                    InputProps={{
                      style: { color: "white" },
                    }}
                    fullWidth
                  />
                </Tooltip>
                <br />
                <br />
                <StyledButton
                  type="submit"
                  onClick={handleSubmit}
                  disabled={
                    !email ||
                    !password ||
                    !username ||
                    password !== confirmPassword
                  }
                >
                  Submit
                </StyledButton>
              </form>
            </GlassyBackground>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                mb: "5rem",
                textAlign: "center",
              }}
            >
              OR
            </Typography>
          </Grid>
          <Grid item alignSelf={"center"}>
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                border: "1px solid white",
                padding: "1rem",
              }}
            >
              Log In!
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUp;
