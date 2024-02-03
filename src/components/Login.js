import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllDetails } from "../redux/userSlice";
import { Typography, Grid, Box } from "@mui/material";
import {
  InputTextField,
  StyledButton,
  GlassyBackground,
} from "../shared/CustomComponents";
import CryptoJS from "crypto-js";
import { useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../utils/auth";

const Login = () => {
  // redux vars
  const dispatch = useDispatch();
  // const baseURL = "asg-pg-1-552288781.us-east-1.elb.amazonaws.com";\
  const { login } = useAuth();

  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
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
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters.");
      return;
    }
    const loginURL = "https://portfolio-server-smoky-six.vercel.app/";
    // const loginURL = "http://localhost:8080/";
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();

      await axios.post(loginURL, { email, hashedPassword }).then((res) => {
        const {user} = res.data;
        // Redirect
        login(user);
        history(`/${user.username}`);
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);

      // Check if the error is due to user not found
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "User not found"
      ) {
        setError("No such user exists. Redirecting to signup...");
        // Redirect to signup page after a delay
        setTimeout(() => {
          history("/signup");
        }, 2000); // 3 seconds delay
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
  };

  return (
    <Box
      sx={{
        height: "100vh",
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
              mb: 4,
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Login Page
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
              <br />
              <br />
              <StyledButton
                type="submit"
                onClick={handleSubmit}
                disabled={!email || !password}
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
            to="/signup"
            style={{
              color: "#fff",
              textDecoration: "none",
              border: "1px solid white",
              padding: "1rem",
            }}
          >
            Sign Up!
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
