import { Button, Typography as T, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { calendars } from "api/calendarsApi"
import { useApiCall } from "helpers/customHooks"
import { mapVehiclesToState } from "helpers/mapVehiclesToState"
import { reduceIconPath } from "helpers/reduceIconPath"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { setVehicles } from "redux/actions"
import { getBookingId, getGlobalStepsData, getStep1, getVehicles } from "redux/selectors"
import { vehicles } from 'api/vehiclesApi'
import { isEqual } from "underscore"

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar"

export const PaymentCheckServises = ({ bookingId }) => {
  const data = useSelector(getGlobalStepsData)
  const {
    location,
    booking_date,
    booking_time,
    destination,
    vehicle,
    total,
    notes,
    passengers,
  } = data
  const { palette: { primary: { blue } } } = useTheme()

  const step1Data = useSelector(getStep1, isEqual)
  const vehicles = useSelector(getVehicles, isEqual)

  const createVehiclesAction = (vehiclesResult) => {
    return setVehicles(mapVehiclesToState(vehiclesResult, step1Data.roadTripReservation))
  }
  const { reFetch } = useApiCall({ handler: vehicles.getVehicles, lazy: true, action: createVehiclesAction })
  useEffect(() => {
    if (!vehicles) {
      reFetch()
    }
  }, [])
  const vehicleType = vehicles.find(({ vehicleId }) => vehicle.vehicle_id)?.oneSeatAllowed ? 'shuttle' : 'private'
  const date = new Date(`${booking_date}:${booking_time}`)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone


  const icalOnClick = async () => {

    if (!bookingId) return
    const calenderResponse = await calendars.submitIcal({ booking_id: bookingId })

    if (!calenderResponse?.order_id) return
    const domain = process.env.NODE_ENV === 'development' ? 'https://sjd-taxi.requestumdemo.com' : window.location.origin
    window.location.assign(`${domain}/wp-content/plugins/sjd-booking/libraries/icalendar/icalendar.php?order_id=${calenderResponse?.order_id}`) //TODO
  }

  const OLD_googleCalendarHandler = () => {
    window.gapi.load('client:auth2', () => {
      console.log('loaded client')

      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      window.gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          console.log('creating event')
          var event = {
            'summary': ` Transportation ${vehicleType} in ${location?.name}`,
            'location': location?.name,
            'description': `
Set to the ${booking_time} on ${booking_date}\n
One Way transfer ${vehicle?.name}, ${passengers} passengers to ${destination?.name}
SJD Taxi, LLC | Need help?
logistics@sjdtaxi.com | USA
248-582-9239 | MEX 624-130-6994
          `,
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
          request.execute(event => {
            window.open(event.htmlLink)
          })
        })
    })
  }

  const googleCalendarHandler = () => {
    const isoDate = new Date(`${booking_date} ${booking_time || '00:00'}`)?.toISOString().replace(/-|:|\.\d\d\d/g, "")

    const params =
      new URLSearchParams({
        action: "TEMPLATE",
        text: ` Transportation ${vehicleType} in ${location?.name}`,
        dates: `${isoDate}/${isoDate}`,
        details: [
          `Set to the ${booking_time} on ${booking_date}`,
          `One Way transfer ${vehicle?.name}, ${passengers} passengers to ${destination?.name}`,
          ``,
          `SJD Taxi, LLC | Need help ?`,
          `logistics@sjdtaxi.com | USA`,
          `248 - 582 - 9239 | MEX 624 - 130 - 6994`
        ].join('\n'),
        location: location?.name || '',
      }).toString()

    window.open('https://www.google.com/calendar/render?' + params, '_blank')
  }

  if (!vehicleType) {
    return null
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
