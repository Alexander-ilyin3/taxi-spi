import { Button, Typography as T, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { calendars } from "api/calendarsApi"
import { reduceIconPath } from "helpers/reduceIconPath"
import { useSelector } from "react-redux"
import { getBookingId } from "redux/selectors"

export const PaymentCheckServises = ({ bookingId }) => {
  const { palette: { primary: { blue } } } = useTheme()

  const icalOnClick = async () => {

    if (!bookingId) return
    const calenderResponse = await calendars.submitIcal({ booking_id: bookingId })

    if (!calenderResponse?.order_id) return
    const domain = process.env.NODE_ENV === 'development' ? 'https://sjd-taxi.requestumdemo.com' : window.location.origin
    window.location.assign(`${domain}/wp-content/plugins/sjd-booking/libraries/icalendar/icalendar.php?order_id=${calenderResponse?.order_id}`) //TODO
  }

  return (
    <Button
      variant="buttonEffectsWrapper"
      onClick={icalOnClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: 'fit-content',
        width: 'max-content'
      }}
    >
      <Box
        height="50px"
        width="50px"
      >
        <img src={reduceIconPath('images/ical.svg')}></img>
      </Box>
      <T variant="h5sb" color={blue}>Add to ICal</T>
    </Button>
  )
}
