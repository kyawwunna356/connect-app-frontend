import React from 'react';
import WidgetWrapper from '../../components/WidgetWrapper';
import {useSelector} from 'react-redux';
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import { Box } from '@mui/system';
import { Divider, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocationOnOutlined, ManageAccountsOutlined, WorkOutline } from '@mui/icons-material';

function UserWidget({tempUser}) {
  const {userData} = useSelector(state => state.user)
  const {palette} = useTheme()
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  return (
    <WidgetWrapper>
      {/* first Row */}
        <FlexBetween marginBottom='1rem'>
            <FlexBetween gap='0.5rem'>
                <UserImage imagePath={tempUser ? tempUser.imagePath : userData.imagePath} />
                <Box>
                  <Typography variant='h4' fontWeight="500" color={dark}>{tempUser ? tempUser.firstName : userData.firstName} {tempUser ? tempUser.lastName : userData.lastName}</Typography>
                  <Typography color={medium} >{tempUser ? tempUser.friends.length : userData.friends.length} friends</Typography>
                </Box>
            </FlexBetween>
            <ManageAccountsOutlined color={dark} fontSize="medium"/>
        </FlexBetween>
        <Box marginBottom='1rem'>
        <Divider marginBottom="1rem" />
        </Box>
      {/* 2nd row */}
      <Box marginBottom='1rem'>
      
        <Box display="flex" alignItems="center" marginBottom='0.75rem'>
          <LocationOnOutlined color={dark} fontSize="medium" sx={{marginRight: '0.5rem'}}/>
          <Typography color={medium}>{tempUser ? tempUser.location : userData.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" marginBottom='0.75rem'>
          <WorkOutline color={dark} fontSize="medium" sx={{marginRight: '0.5rem'}}/>
          <Typography color={medium}>{tempUser ? tempUser.occupation : userData.occupation}</Typography>
        </Box>
      </Box>

      {/* 3rd row */}
      <Box>
        <FlexBetween>
          <Typography color={medium}>Who's has viewed your profile</Typography>
          <Typography>{tempUser ? tempUser.viewedProfile : userData.viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your profile</Typography>
          <Typography>{tempUser ? tempUser.impressions : userData.impressions}</Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget