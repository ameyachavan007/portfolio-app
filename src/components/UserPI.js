import { Box, Typography } from '@mui/material'
import React from 'react'

const UserPI = ({ firstName, lastName, tag }) => {
  return (
    <React.Fragment>
       <Box component={'div'}>
              <Typography
               variant="h3"
              
               sx={{ color: "#D6DEEF", fontWeight: "bold", mb: 1 }}
             >
               {firstName} {lastName}
             </Typography>
          </Box>
          <Box component={'div'}>
            <Typography
               variant="h5"
               sx={{ color: "#D6DEEF", }}
             >
               Software Engineer 1
             </Typography>
          </Box>
          <Box component={'div'}>
             <Typography
               variant="body1"
               gutterBottom
               sx={{ color: "#8F9DB3", mt: "1rem", maxWidth: "20rem",}}
             >
               {tag}
             </Typography>
          </Box>
    </React.Fragment>
  )
}

export default UserPI
