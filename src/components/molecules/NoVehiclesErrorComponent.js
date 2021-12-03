import { useTheme } from "@emotion/react"
import { Typography as T } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useRef } from "react"

export const NoVehiclesErrorComponent = ({ noVehiclesError }) => {
  const { palette: { error: { main: error } } } = useTheme()

  const componentRef = useRef(null)

  useEffect(() => {
    if (noVehiclesError) {
      componentRef.current.scrollIntoView()
    }
  }, [noVehiclesError])

  return (
    noVehiclesError ? (
      <Box
        ref={componentRef}
      >
        <T
          variant="h4"
          color={error}
          sx={{ fontWeight: 500 }}
        >
          Sorry, we do not have a route between these two locations. Please adjust the start/end location to try again.
        </T>
      </Box>
    ) : null
  )
}
