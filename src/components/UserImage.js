import { Box } from '@mui/system'
import React from 'react'
import { SERVER_URL } from '../utils'

function UserImage({imagePath,size=50}) {
  return (
    <Box width={size} height={size}>
        <img style={{width: size,height: size, objectFit:'cover',borderRadius: '50%'}} src={`${SERVER_URL}/assets/${imagePath}`} alt="" />
    </Box>
  )
}

export default UserImage