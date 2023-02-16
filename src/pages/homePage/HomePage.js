import { useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { fetchSingleUser } from '../../redux/features/userSlice'
import Nav from '../nav/Nav'
import FriendList from '../widgets/FriendList'
import PostAddWidget from '../widgets/PostAddWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'

function HomePage() {
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleUser({id: user.userData._id,token: user.token})) 
  },[])

  useEffect(() => {})
  if(user.status === "loading") return <Loader />
  if(user.status === "error") console.log(user.error)

  

  if(user.userData) return (
    <Box height="100vh" overflow='auto'>
      <Nav />
      <Box display={isBigScreen ? 'flex': 'block'} justify-content="center" align-items="center" gap='1rem' padding="2rem 6%">
         {/* user */}
         <Box flexBasis={isBigScreen ? "25%": undefined}>
          <UserWidget />
         </Box>
         {/* newsfeed */}
         <Box flexBasis={isBigScreen ? "50%": undefined} mt={isBigScreen ? "0" : '2rem'}  overflow="auto">
          <PostAddWidget />
          <Box mt='2rem' height={isBigScreen ? "500px": 'auto'}>
            <PostsWidget />
          </Box>
         </Box>
         {/* friends */}
         <Box display={isBigScreen ? "block" : "none"} flexBasis={isBigScreen ? "25%" : undefined} mt={isBigScreen ? "0" : '2rem'}>
            <FriendList />
         </Box>
      </Box>

    </Box>
    
  )
}

export default HomePage