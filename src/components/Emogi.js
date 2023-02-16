import { Typography } from '@mui/material'
import React from 'react'

function Emogi({children,appendEmogi}) {
  return (
    <Typography sx={{cursor: "pointer"}} onClick={(e) => appendEmogi(e)}> {children}</Typography>
  )
}

export default Emogi