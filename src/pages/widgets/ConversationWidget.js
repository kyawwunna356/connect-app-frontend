import { Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Conver from '../../components/Conver'
import WidgetWrapper from '../../components/WidgetWrapper'
import { getConversations } from '../../redux/features/conversation'


const ConversationWidget = () => {
  const {data : conversations} = useSelector(getConversations)
 
  const {palette} = useTheme()
  const dark = palette.neutral.dark;


  return (
    <>
      
      <WidgetWrapper>
      <Typography variant='h3' color={dark} mb='1.5rem' fontWeight="500">Conversations</Typography>
        {conversations.map(conver => (
          <Conver  conver={conver} key={conver._id}/>
        ))}
      </WidgetWrapper>
    </>
  )
}

export default ConversationWidget