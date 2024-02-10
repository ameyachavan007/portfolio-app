import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@mui/material';

const NotFound = () => {
    return (
        <Box sx={{height: '100vh', display:'flex', justifyContent: 'center', alignItems:'center'}}>
        <Container maxWidth="sm">
            <Typography variant="h2" align="center" sx={{color:'white'}} gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" sx={{color: '#8F9DB3'}} align="center" paragraph>
                The page you are looking for does not exist.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/login">
                    <Button variant="contained" color="primary">
                        Go to Login Page
                    </Button>
                </Link>
            </div>
        </Container>
        </Box>
    );
};

export default NotFound;
