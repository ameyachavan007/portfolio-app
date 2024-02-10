import { Box, Grid, Typography } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import PAGE_HEADINGS from '../assets/constants'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { InputTextField, StyledButton } from '../shared/CustomComponents'
import axios from 'axios';

const Home = () => {
    const history = useNavigate();
    const [visit, setVisit] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);

    const visitChangeHandler = (event) => {
        setVisit(event.target.value);
    }

    const handleVisitSubmit = async  (event) => {
        event.preventDefault();

        const visitURL = 'http://localhost:8080/home';
         try {
            let response = await axios.post(visitURL, {username: visit});
            if(response.data.message === "Username exists"){
                setIsError(false);
                setError("Fetching the profile...")
                setTimeout(() => {
                    history(`/${visit.trim().toLowerCase()}`)
                }, 2000);
            }
         } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error === "Username not found"
              ) {
                setVisit("");
                setIsError(true);
                setError("Username does not exist, please try a different username...");
              }
         }
    }

  return (
    <Box  
        sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: 'linear-gradient(to right bottom, #2D394D, #0F172A)'
        }}
    >
        <Grid container xs={10} sm={8} md={6} lg={4} sx={{maxHeight: '500px'}}>
            <Grid item xs={12}>
            <Typography
            variant="h4"
            sx={{
            color: "white",
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {PAGE_HEADINGS.HOME}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#8F9DB3",
              mb: 4,
              textAlign: "center",
              // fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {PAGE_HEADINGS.HOME_SUB}
          </Typography>
            </Grid>
            <Grid item xs={12}>
            {error && (
            <div
              className= {isError ? "error" : "success"}
            >
              {error}
            </div>
          )}
          <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center',  width: '100%'}}>

          <InputTextField
                type="text"
                value={visit}
                label="Username"
                onChange={visitChangeHandler}
                // margin="normal"
                placeholder="Enter the username..."
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{mr: 2}}
                fullWidth   
              />
              <StyledButton onClick={handleVisitSubmit} sx={{borderRadius: '2rem', height: "2rem", width:"2rem"}}>
                <ArrowForwardIcon></ArrowForwardIcon>
              </StyledButton>
          </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{display:'flex', width: '100%', justifyContent:'space-between', mt:2}}>
                    <Link
                        to="/login"
                        className="links"
                        sx={{mr: 1}}
                    >
                        Already a User? Log In!
                    </Link>
                    <Box sx={{width: '1rem'}}></Box>
                    <Link
                        to="/signup"
                        className="links"
                        sx={{ml:1}}
                    >
                        New User? Create Account
                    </Link>
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default Home
