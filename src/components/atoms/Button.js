import { Button as MuiButton } from "@mui/material"


export const Button = ({children, ...props}) => {
  return (
    <MuiButton {...props}>
      {children}
    </MuiButton>
  )
}