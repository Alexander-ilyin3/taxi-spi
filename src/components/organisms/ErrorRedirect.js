import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { getAxiosError } from "redux/selectors"

export const ErrorRedirect = () => {
  const ajaxError = useSelector(getAxiosError)
  if (ajaxError === null) {
    return null
  }

  return (
    <Redirect
      to={{
        pathname: '/error-page',
        axiosErrorMessage: ajaxError
      }}
    />
  )
}