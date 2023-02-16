import {
  Delete,
  MessageRounded,
  PersonAddOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../redux/features/conversation";
import { deletePost } from "../redux/features/postSlice";
import { addRemoveFriend } from "../redux/features/userSlice";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function Friend({ name, friendId, profilePath, location, messengerPage,postId }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userData: { friends, _id },
    token,
  } = useSelector((state) => state.user);

  //colors
  const primaryMain = theme.palette.primary.main;
  const main = theme.palette.neutral.main;
  const medium = theme.palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isOwnPost = friendId === _id;

  //functions
  const handleClick = (postId) => {
    if(!isOwnPost) dispatch(addRemoveFriend({ userId: _id, friendId, token }))
    if(isOwnPost) dispatch(deletePost({token,postId}))
  };

  const createNewConver = () => {
    dispatch(createConversation({token,userId: _id,friendId: friendId})).unwrap()
    .catch(error => toast.error(error.response.data))
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage imagePath={profilePath} size={50} />
        <Box onClick={() => navigate(`/profile/${friendId}`)}>
          <Typography
            color={main}
            sx={{ "&:hover": { color: primaryMain }, cursor: "pointer" }}
          >
            {name}
          </Typography>
          <Typography color={medium} variant="subtitle1">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
      {messengerPage ? (
        <IconButton onClick={createNewConver}>
            <MessageRounded />
        </IconButton>
      ) : (
        <IconButton onClick={() => {handleClick(postId)}}>
          {isOwnPost ? (
            <Delete color={main} />
          ) : isFriend ? (
            <PersonRemoveOutlined color={main} />
          ) : (
            <PersonAddOutlined color={main} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default Friend;
