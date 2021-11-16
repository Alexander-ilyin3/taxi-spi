import { reduceIconPath } from "helpers/reduceIconPath"
import { Link } from "react-router-dom"

const { Box } = require("@mui/material")

const SiteHeader = () => {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      paddingBottom: '26px',
      paddingTop: '26px',
    }}
    >
      <Link to="/">
        <img src={reduceIconPath("images/Logo.svg")} height="90" width="90" alt="Site logo" />
      </Link>
    </Box>
  )
}

export { SiteHeader }