import { useTheme } from '@emotion/react';
import { Delete } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteConversation, selectConver } from '../redux/features/conversation';
import FlexBetween from './FlexBetween'
import UserImage from './UserImage'

function Conver({conver,setSelectedConver}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userData: { _id },
    token,
  } = useSelector((state) => state.user);
  const [friend] = conver.members.filter(el => el._id !== _id)
  const name = friend.firstName + ' ' + friend.lastName
 
  //colors
  const light = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const main = theme.palette.neutral.main;
  const medium = theme.palette.neutral.medium;



  return (
    <Box onClick={() => dispatch(selectConver(conver))} marginBottom="1rem">
      <FlexBetween>
        <Box sx={{display: 'flex',justifyContent: 'start', alignItems: 'center' , gap: '1rem'}}> 
          <UserImage imagePath={friend.imagePath} size={50} />
          <Box >
            <Typography
              color={main}
              sx={{ "&:hover": { color: primaryMain }, cursor: "pointer" }}
            >
              {name}
            </Typography>
            <Typography color={medium} variant="subtitle1">
              {friend.location}
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={() => dispatch(deleteConversation({converId: conver._id,token}))}>
          <Delete />
        </IconButton>
      </FlexBetween>
    </Box>
  )
}

export default Conver