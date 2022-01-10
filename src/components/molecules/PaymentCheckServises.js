import { Button, Typography as T, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { calendars } from "api/calendarsApi"
import { reduceIconPath } from "helpers/reduceIconPath"
import { useSelector } from "react-redux"
import { getBookingId, getGlobalStepsData } from "redux/selectors"

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar"

export const PaymentCheckServises = ({ bookingId }) => {
  const data = useSelector(getGlobalStepsData)
  console.log(data)
  const {
    location,
    booking_date,
    booking_time,
    destination,
    vehicle,
    total,
    notes,
  } = data
  const { palette: { primary: { blue } } } = useTheme()

  const date = new Date(`${booking_date}:${booking_time}`)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const icalOnClick = async () => {

    if (!bookingId) return
    const calenderResponse = await calendars.submitIcal({ booking_id: bookingId })

    if (!calenderResponse?.order_id) return
    const domain = process.env.NODE_ENV === 'development' ? 'https://sjd-taxi.requestumdemo.com' : window.location.origin
    window.location.assign(`${domain}/wp-content/plugins/sjd-booking/libraries/icalendar/icalendar.php?order_id=${calenderResponse?.order_id}`) //TODO
  }

  const googleCalendarHandler = () => {
    window.gapi.load('client:auth2', () => {
      console.log('loaded client')

      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })


      window.gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      window.gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        console.log('creating event')
        var event = {
          'summary': `${location?.name} - ${destination?.name}`,
          'location': location?.name,
          'description': `${vehicle?.vehicle_count} ${vehicle?.name}.\nTotal: ${total}$.\n${notes}`,
          'start': {
            'dateTime': date,
            'timeZone': timezone,
          },
          'end': {
            'dateTime': date,
            'timeZone': timezone,
          },
          'reminders': {
            'useDefault': true,
          }
        }

        var request = window.gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })
        console.log({ request })
        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
      })
    })
  }

  return (
    <Button
      variant="buttonEffectsWrapper"
      onClick={googleCalendarHandler}
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
        <img height="50" alt="google calendar" src={reduceIconPath('images/GoogleCalendar.png')}></img>
      </Box>
      <T variant="h5sb" color={blue}>Add to Google Calendar</T>
    </Button>
  )
}
