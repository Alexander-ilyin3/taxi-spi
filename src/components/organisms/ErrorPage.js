import { Box } from "@mui/system"
import { SiteHeader } from "components/molecules/SiteHeader"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router"
import { setAxiosError } from "redux/actions"

export const ErrorPage = (props) => {
  const errorMessage = props?.history?.location?.axiosErrorMessage || null
  const dispatch = useDispatch()

  useEffect(() => {
    return () =>  dispatch(setAxiosError(null))
  }, [])

  if (!errorMessage) return (
    <>
    <Redirect
      to={{
        pathname: '/'
      }}
    />
    </>
  )

  return (
    <>
      <SiteHeader />
      <Box
        sx={{
          textAlign: 'center'
        }}
      >
        <h1>Error happened:</h1>
        <div>{errorMessage}</div>
      </Box>
    </>
  )
}
