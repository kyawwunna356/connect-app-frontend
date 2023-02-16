import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import {createTheme, ThemeProvider ,CssBaseline} from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {Toaster} from 'react-hot-toast';
import MessengerPage from "./pages/MessengerPage/MessengerPage";
import SearchPage from "./pages/SearchPage/SearchPage";




function App() {
  const mode = useSelector(state => state.mode.status)
  const {token} = useSelector(state => state.user)
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])
  
  return (
    <>
      <ThemeProvider theme={theme}> 
      <CssBaseline/>
        <Toaster position="top-center"/>
        <Routes>
          
          <Route path="/home" element={ token ? <HomePage /> : <Navigate to='/'/> }/>
          <Route path="/" element={ token ? <Navigate to='/home'/>: <LoginPage />  }/>
          <Route path="/search" element={ token ? <SearchPage /> : <Navigate to='/'/> }/>
          <Route path="/profile/:id" element={ token ? <ProfilePage /> : <Navigate to='/'/> }/>
          <Route path="/messenger" element={ token ? <MessengerPage /> : <Navigate to='/'/> }/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
