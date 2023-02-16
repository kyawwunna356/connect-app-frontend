import { Box, styled } from '@mui/material'

const WidgetWrapper = styled(Box)(({theme}) => ({
    padding: '1rem',
    backgroundColor: theme.palette.background.alt,
    borderRadius: '0.75rem',
}))
export default WidgetWrapper