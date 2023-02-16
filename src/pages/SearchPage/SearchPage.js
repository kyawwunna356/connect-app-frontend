import { useTheme } from "@emotion/react";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { getSearchUser, getToken } from "../../redux/features/userSlice";
import { SERVER_URL } from "../../utils";
import Nav from "../nav/Nav";

function SearchPage() {
  const theme = useTheme();
  const token = useSelector(getToken);
  const searchUser = useSelector(getSearchUser);
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const dark = theme.palette.neutral.dark
  //states
  const [searchUsers, setSearchUser] = useState([]);
  useEffect(() => {
    const getSearchUsers = async () => {
      const res = await axios({
        url: `${SERVER_URL}/users/search?name=${searchUser}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setSearchUser(res.data);
    };

    getSearchUsers();
  }, [searchUser]);
  return (
    <>
      <Nav /> 
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      <Typography margin="1rem auto" variant='h3' color={dark} mb='1.5rem' fontWeight="500">Search results for {searchUser}</Typography>
      <Box width={isBigScreen ? "50%" : "90%"} margin="1rem auto">
        <WidgetWrapper
          display="flex"
          flexDirection='column'
          
          justifyContent="center"
          alignItems="center"
        >
          {searchUsers.length > 0
            ? searchUsers.map((el) => (
                <Box key={el._id} width="100%">
                <Friend
                  friendId={el._id}
                  name={`${el.firstName} ${el.lastName}`}
                  location={el.location}
                  profilePath={el.imagePath}
                />
                <Divider sx={{margin: '1.5rem 0'}} />
                </Box>
              ))
            : <Typography variant="h6">No users found</Typography>}
        </WidgetWrapper>
      </Box>
      </Box>
    </>
  );
}

export default SearchPage;
