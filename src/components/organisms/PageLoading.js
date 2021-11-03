import { CircularProgress } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { useSelector } from "react-redux"
import { getIsLoading } from "redux/selectors"

export const PageLoading = () => {
  const isLoading = useSelector(getIsLoading)

  const { palette: { primary: { white } } } = useTheme()

  if (!isLoading) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        backgroundColor: white,
        transition: 'all 1s', //TODO
        zIndex: 999,
      }}
    >
      <CircularProgress
        thickness={2.8}
        size={100}
      />
    </Box>
  )
}
