const { Box } = require("@material-ui/system")

const SiteHeader = () => {

  return (
    <Box sx={{
      height: 140,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      paddingBottom: 40,
      paddingTop: 40,

    }}
    >
      <img src="pics/Group 4.svg"></img>
    </Box>
  )
}

export { SiteHeader }