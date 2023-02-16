import { useTheme } from "@emotion/react";
import { Box, Button, Divider, IconButton, InputBase, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../utils";
import WidgetWrapper from "../../components/WidgetWrapper";
import { getToken, getUserId } from "../../redux/features/userSlice";
import Message from "../../components/Message";
import FlexBetween from "../../components/FlexBetween";
import { MoodOutlined, Send } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
import { getSelectedConversation } from "../../redux/features/conversation";
import { et } from "date-fns/locale";
import Emogi from "../../components/Emogi";
import ChatLoader from "../../components/ChatLoader";

function ChatWidget({socket}) {
  const { palette } = useTheme();
  const  token  = useSelector(getToken);
  const userId = useSelector(getUserId)
  const dark = palette.neutral.dark;
  const neutralLight = palette.neutral.light;
  const  selectedConversation  = useSelector(getSelectedConversation);

  //states
  const [messages, setMessages] = useState(null);
  const [receivedMessage,setReceivedMessage] = useState({});
  const [input, setInput] = useState('');
  const [isEmogiOpen,setIsEmogiOpen] = useState(false);
  const friend = selectedConversation?.members?.find(member => member._id !== userId)
  
  console.log('rcv msg', receivedMessage)

  //add the message to mongo db and handles sockets
  const sendMessage = async (temp) => {
    const res = await axios({
      method: 'post',
      url : `${SERVER_URL}/message/${selectedConversation._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        sender: userId,
        message: temp
      }
    });
    setMessages(prevState => [...prevState,res.data]);
    
  };
 
  //set the input
  const handleChange = (e) => {
    setInput(e.target.value);
  };
 

  //form submitted or button clicked
  const handleSubmit = (e) => {
    e.preventDefault()

    //find the receiverId
    const {_id: receiverId} = selectedConversation?.members?.find(member => member._id !== userId)
    let temp = input
    setInput('')

    //emit send event 
    socket.emit('sendMessage', {senderId: userId,receiverId,text: temp})

    //save to mongodb
    sendMessage(temp);
  }

  //to fetch the messages of the selected conversations
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios(`${SERVER_URL}/message/${selectedConversation._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data);
    };

    fetchMessages();
  }, [selectedConversation]);


  useEffect(() => {
    console.log('this run')
    socket?.on('getMessage', ({senderId, text}) => {
      console.log('this run' ,text)
      setReceivedMessage({
        _id: uuidv4(),
        sender: senderId,
        message: text,
        conversation_id: selectedConversation._id,
      })
    })

  },[socket,selectedConversation])
  
  // push the new get messages
  useEffect(() => {
    if(receivedMessage?.sender !== userId) {
      if (messages?.length > 0 && receivedMessage.conversation_id === selectedConversation._id) {
        setMessages( (prev) => [...prev, receivedMessage])
      }
  }
  },[receivedMessage])
  
  useEffect(() => {
    console.log(receivedMessage)
  },[receivedMessage])


  //utils fucntions for Chat
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  function appendEmogi(e) {
    setInput(prev => {
      prev += e.target.innerHTML
      return prev
    })
  }
  
  //wait if we don't get the message
  if (messages === null) return <ChatLoader />
  return (
    <>
      <WidgetWrapper minHeight="70vh" maxHeight="70vh" overflow="auto">
        <Typography variant="h3" color={dark} mb="1.5rem" fontWeight="500">
          Chats {friend && `(${friend?.firstName} ${friend?.lastName})`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
        {
          isEmpty(selectedConversation) ? 
          <Typography variant="h6" color={neutralLight}>
              Select a conversation
            </Typography>
            :
          <>
          {
            messages?.length === 0 ? (
            <Typography variant="h6" color={neutralLight}>
              Send a message to start a conversation
            </Typography>
          ) : (
            messages?.map(mess => <Message key={mess._id} sender={mess.sender} message={mess.message}/>)
          )}
          </>

        }
        </Box>

        {/* inputbox */}
      </WidgetWrapper>
      <Box>
        <Divider
          sx={{ margin: "1rem 0" }}
          position="fixed"
          bottom="0"
          right="0"
          left="0"
        />
        <form onSubmit={handleSubmit} style={{position: 'relative'}}>
          <Box display={isEmogiOpen ? "flex" : 'none'} flexWrap="wrap" justifyContent='space-around' alignItems="center"  position='absolute' right="1rem" bottom="3rem" zIndex="20" borderRadius="1rem" backgroundColor={neutralLight} padding="0.5rem">
            <Emogi appendEmogi={appendEmogi}> 😄 </Emogi>
            <Emogi appendEmogi={appendEmogi}> 😢</Emogi>
            <Emogi appendEmogi={appendEmogi}> 😠</Emogi>
            <Emogi appendEmogi={appendEmogi}> 😢</Emogi>
            <Emogi appendEmogi={appendEmogi}> 😲</Emogi>
            <Emogi appendEmogi={appendEmogi}> 😚</Emogi>
            <Emogi appendEmogi={appendEmogi}> 👍</Emogi>
            <Emogi appendEmogi={appendEmogi}> 💯</Emogi>
          </Box>
          <FlexBetween border={`1px solid ${neutralLight}`} borderRadius="1rem">
            <InputBase
              placeholder="send a message"
              sx={{ padding: "0.75rem" , width: '100%'}}
              onChange={handleChange}
              value={input}
            />
             <IconButton onClick={() => setIsEmogiOpen(prev => !prev)}>
              <MoodOutlined />
            </IconButton>
            <IconButton onClick={handleSubmit} >
              <Send />
            </IconButton>
          </FlexBetween>
        </form>
      </Box>
    </>
  );
}

export default ChatWidget;
