import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

function Loader() {
  return (
    <Box display='flex' justifyContent="center" alignItems="center" height='100vh' gap='1rem'>
      <CircularProgress color='primary' />
        <Typography color="primary" variant="h4" >Loading...</Typography>
    </Box>
  )
}

export default Loader