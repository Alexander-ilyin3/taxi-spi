import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => {
  return {
    button: { ...theme.fieldText, margin: 10 }
  }
})

export default useStyles;