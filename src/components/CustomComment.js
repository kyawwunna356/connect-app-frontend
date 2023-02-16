import { Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import UserImage from './UserImage'

function CustomComment({comment}) {
  const theme = useTheme()
  const light = theme.palette.neutral.light;
  return (
        <Box display='flex' justifyContent="start" alignItems='start' gap='0.8rem' mb="0.8rem">
             <UserImage imagePath={comment.profilePath} size={30}/>
         <Box sx={{background: light, p: '0.7rem', borderRadius: '0.8rem'}}>
            <Typography variant='subtitle2'>{comment.firstName} {comment.lastName}</Typography>
            <Typography>{comment.text}</Typography>
         </Box>
    </Box>
  )
}

export default CustomComment