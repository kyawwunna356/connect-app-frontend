import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, getUserId } from '../../redux/features/userSlice'
import Nav from '../nav/Nav'
import ChatWidget from '../widgets/ChatWidget'
import ConversationWidget from '../widgets/ConversationWidget'
import FriendList from '../widgets/FriendList'
import Loader from '../../components/Loader'
import conversation, { fetchConversations, getConversations, getSelectedConversation } from '../../redux/features/conversation'
import { toast } from 'react-hot-toast'
import { io } from "socket.io-client";
import { SERVER_URL } from '../../utils'
import { v4 as uuidv4 } from 'uuid';

// const socket = io(SERVER_URL)
function MessengerPage() {
  //states
  const [socket,setSocket] = useState(null)
  const [socketLoading,setSocketLoading] = useState(true)
  const conversations = useSelector(getConversations)
  const  selectedConversation  = useSelector(getSelectedConversation);
  const token = useSelector(getToken)
  const userId = useSelector(getUserId)
  const dispatch = useDispatch()
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'))
  // const [receivedMessage,setReceivedMessage] = useState({});
  // const [temp ,setTemp] = useState('')
  // console.log('rcv msg', receivedMessage)
  console.log('this is socket', socket?.id)
  // console.log('tmp',temp)
//get conversations
  useEffect(() => {
    dispatch(fetchConversations({token,userId})) 
  },[token,userId,dispatch])

   //initilize the socket instance for the current user
  useEffect(() => {
    const newSocket = io(SERVER_URL)
    setSocket(newSocket)
    

    // return () => {
    //   socket?.emit('forceDisconnect')
    // }
  },[])
  

  useEffect(() => {
    socket?.emit('addUser' , userId)

    socket?.on('onlineUsers', (onlineUsers) => {
      console.log(onlineUsers)
    })
    
    setSocketLoading(false)

  }, [socket]) 

 
  
  if(conversations.status === 'loading') return <Loader />
  if(socketLoading) return <Loader />
  return (
    <Box height="100vh">
      <Nav />
      <Box display={isBigScreen ? 'flex': 'block'} justify-content="center" align-items="center" gap='1rem' padding="2rem 6%" >
         {/* user */}
         <Box flexBasis={isBigScreen ? "25%": undefined}>
          <ConversationWidget />
         </Box>
         {/* newsfeed */}
         <Box flexBasis={isBigScreen ? "50%": undefined} mt={isBigScreen ? "0" : '2rem'}>
            <Box height='auto' >
              <ChatWidget socket={socket} />
            </Box>
         </Box>
         {/* friends */}
         <Box flexBasis={isBigScreen ? "25%" : undefined} mt={isBigScreen ? "0" : '2rem'}>
            <FriendList messengerPage={true}/>
         </Box>
      </Box>
    </Box>
  )
}

export default MessengerPage