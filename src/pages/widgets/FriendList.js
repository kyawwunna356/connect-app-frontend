import { useTheme } from '@emotion/react'
import { Box, Typography} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'

function FriendList({tempUserFriends,messengerPage=false}) {
  const {friends} = useSelector(state => state.user.userData)
  const tempFriend = tempUserFriends ? tempUserFriends:  friends
  const theme = useTheme()
  const dark = theme.palette.neutral.dark;
  return (
    <WidgetWrapper>
        <Typography variant='h3' color={dark} mb='1.5rem' fontWeight="500">Friends</Typography>
        {tempFriend.length > 0 ? 
          tempFriend.map(friend => 
        <Box marginBottom='1rem' key={friend._id}>
            <Friend  
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`} 
              location={friend.location}
              profilePath = {friend.imagePath}
              messengerPage={messengerPage}
              />
        </Box>) : 
        <Typography textAlign='center' color={theme.palette.neutral.main}>
        
        🥲 You have no friends
        </Typography>

        }
    </WidgetWrapper>
  )
}

export default FriendList