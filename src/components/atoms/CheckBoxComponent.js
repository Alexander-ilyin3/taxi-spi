const { Checkbox } = require("@material-ui/core")
const { useTheme } = require("@material-ui/system")


export const CheckBoxComponent = () => {
  const theme = useTheme()
  const { palette: { primary: { grey, white, blue } } } = theme
  return (
    <Checkbox
      defaultChecked
      sx={{
        color: grey,
        '&.Mui-checked': {
          color: blue,
        },
      }}
    />
  )
}
