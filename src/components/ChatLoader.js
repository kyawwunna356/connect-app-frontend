import { useTheme } from '@emotion/react';
import { CircularProgress, Typography } from '@mui/material'
import React from 'react'
import WidgetWrapper from './WidgetWrapper'

function ChatLoader() {
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  return (
    <WidgetWrapper minHeight="70vh" maxHeight="70vh" overflow="auto" display="flex" alignItems='center' justifyContent='center'>
        <CircularProgress />
        <Typography variant="h6" color={neutralLight}>
              Loading...
            </Typography>
    </WidgetWrapper>
  )
}

export default ChatLoader