import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ChatBubble,
  ChatBubbleRounded,
  DarkMode,
  LightMode,
  Message,
  MessageRounded,
  Refresh,
  Search,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { changeMode } from "../../redux/features/modeSlice";
import { width } from "@mui/system";
import { changeSearchUser, logOut } from "../../redux/features/userSlice";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  //state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isbigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [input, setInput] = useState('')
  const neutralLight = theme.palette.neutral.light;
  const neutralDark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const primarylight = theme.palette.primary.light;

  const { userData } = useSelector((state) => state.user);
  const fullName = `${userData.firstName} ${userData.lastName}`;


  const handleSubmit = () => {
    if(window.location.pathname === '/search?') {
      console.log(window.location.pathname)
      dispatch(changeSearchUser(input))
    } else {
      dispatch(changeSearchUser(input))
      navigate('/search', {replace: true})
    }
    // flexWrap: 'wrap',gap: '1rem' 
  }
  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      sx={{ position: "sticky", top: 0, right: 0, left: 0, zIndex: 20, flexDirection: !isbigScreen && 'column', gap: '1rem'}}
    >
      {/* left side */}
      <FlexBetween gap="1.5rem">
        <Typography
          fontWeight="bold"
          color="primary"
          fontSize={isbigScreen ? "2rem" : "1.3rem"}
          onClick={() => navigate("/")}
          sx={{
            "&:hover": { color: primarylight, cursor: "pointer" },
          }}
        >
          Connect{" "}
        </Typography>
        {/* Search bar */}
        {(
          <form onSubmit={handleSubmit}>
            <FlexBetween
              backgroundColor={neutralLight}
              padding="0.3rem 0.9rem"
              borderRadius="0.5rem"
            >
              <InputBase placeholder="Search..." onChange={(e) => setInput(e.target.value)}/>
              <IconButton onClick={handleSubmit}>
                <Search />
              </IconButton>
            </FlexBetween>
          </form>
        )}
      </FlexBetween>

      {/* right side */}
      <FlexBetween gap="1rem" width={isbigScreen ? "auto": '100%'}>
        <Box>
          {/* icons */}
          {/* chats */}
        <IconButton onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton onClick={() => dispatch(changeMode())}>
          {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
        {/* chat */}
        <IconButton onClick={() => navigate("/messenger")}>
          <ChatBubbleRounded />
        </IconButton>
        {/* user */}
        </Box>

        <Select
          value="fullName"
          sx={{
            backgroundColor: neutralLight,
            p: "0.3rem 1rem",
            borderRadius: "0.5rem",
            width: "130px",
          }}
          input={<InputBase />}
        >
          <MenuItem
            onClick={() => navigate(`/profile/${userData._id}`)}
            value="fullName"
            selected
          >
            {fullName}
          </MenuItem>
          <MenuItem onClick={() => dispatch(logOut())}>Logout</MenuItem>
        </Select>
      </FlexBetween>
    </FlexBetween>
  );
}

export default Nav;
