import { Box, CircularProgress } from '@mui/material'


function Loading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size="7rem" />
      </Box>
  )
}

export default Loading
