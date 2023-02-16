import { Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUserId } from '../redux/features/userSlice'
import UserImage from './UserImage'

function Message({sender,message}) {
    const theme = useTheme()
    const primary = theme.palette.primary.main
    const neutralLight = theme.palette.neutral.light
    const _id = useSelector(getUserId)
    const isSender = sender === _id
  return (
   <Box sx={{alignSelf: isSender ? 'self-end' : 'self-start'}}>
    <Typography  borderRadius='1.75rem' variant='subtitle1' p='1rem' sx={{backgroundColor: isSender ? primary : neutralLight, width: 'fit-content',}}>{message}</Typography>
   </Box>
  )
}

export default Message