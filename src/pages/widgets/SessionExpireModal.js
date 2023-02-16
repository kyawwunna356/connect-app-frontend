import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import WidgetWrapper from '../../components/WidgetWrapper'

function SessionExpireModal({setShowModal}) {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.clear()
        setShowModal(false)
        navigate(0)
    }
  return (
    <Box sx={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.3)',
        height: '100vh'
    }}>
        <WidgetWrapper>
        <Typography>Session Expired</Typography>
        <Typography>Please login again</Typography>
        <Button onClick={handleClick}>Ok</Button>
        </WidgetWrapper>
    </Box>
  )
}

export default SessionExpireModal