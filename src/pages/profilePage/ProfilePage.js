import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from '../../components/Loader'
import Nav from "../nav/Nav";
import FriendList from "../widgets/FriendList";
import PostAddWidget from "../widgets/PostAddWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../utils";

function ProfilePage() {
  const theme = useTheme();
  const token = useSelector((state) => state.user.token);
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const {id} = useParams()
  const [tempUser,setTempUser] = useState(null)
  const [loading,setLoading] = useState(true)
  console.log(tempUser)

  useEffect(() => {
    setLoading(false)
  },[id])

  useEffect(() => {
     axios(`${SERVER_URL}/users/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
     })
     .then(res => setTempUser(res.data))    
     .then(setLoading(false)) 
  },[id])
 
  if(loading) return <Loader />
   return (
    <Box height="100vh">
      <Nav />
      <Box
        display={isBigScreen ? "flex" : "block"}
        justify-content="center"
        align-items="center"
        gap="1rem"
        padding="2rem 6%"
      >
        {/* user */}
        <Box flexBasis={isBigScreen ? "25%" : undefined}>
          <UserWidget tempUser={tempUser} />
          <Box sx={{margin:'2rem 0'}}/>
          <Box display={isBigScreen ? 'block': 'none'}>
          {/* {FriendList} */}
            <FriendList tempUserFriends={tempUser?.friends}/>
          </Box>
        </Box>
        {/* newsfeed */}
        <Box
          flexBasis={isBigScreen ? "50%" : undefined}
          mt={isBigScreen ? "0" : "2rem"}
        >
          <Box
            height={isBigScreen ? "500px" : "auto"}
            overflow="auto"
          >
            <PostsWidget userId={tempUser?._id} profile={true}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
