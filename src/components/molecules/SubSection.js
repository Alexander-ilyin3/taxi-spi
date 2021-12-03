import { Typography as T } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { DatePicker } from "components/molecules/DatePicker"
import { FlexBoxRow } from "components/atoms/FlexBoxRow"
import { InputBox } from "./InputBox"
import { TimePicker } from "components/molecules/TimePicker"
import { GridWrapper } from "components/atoms/GridWrapper"

const BookingDateTime = () => {
  const { palette: { primary: { blue } } } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <FlexBoxRow>
        <DatePicker r name="bookingDate" labelText="Booking Date" />
        <TimePicker r name="bookinglTime" labelText="Booking Time" />
      </FlexBoxRow>
    </Box>
  )
}

const SubSectionRenderHelper = ({ departure, arrival }) => {

  const { palette: { primary: { blue } } } = useTheme()

  if (!departure && !arrival) return null

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <T variant='h4' sx={{ color: blue }}>{departure ? 'DEPARTURE' : 'ARRIVAL'} FLIGHT DETAILS</T>
      <FlexBoxRow>
        <DatePicker r name={departure ? 'departureDate' : 'bookingDate'} labelText={departure ? 'Departure Date' : 'Arrival Date'} />
        <TimePicker r name={departure ? 'departureTime' : 'bookinglTime'} labelText={departure ? 'Departure Time' : 'Arrival Time'} />
      </FlexBoxRow>
      <GridWrapper>
        <InputBox r name={departure ? 'departureAirline' : 'arrivalAirline'} labelText="Airline" />
        <InputBox r name={departure ? 'departureFlightNumber' : 'arrivalFlightNumber'} labelText="Flight Number" />
      </GridWrapper>
    </Box>
  )
}

export const SubSection = ({ departure, arrival }) => {
  const somethingIsAirport = departure || arrival

  return (
    somethingIsAirport ? (
      <>
        <SubSectionRenderHelper arrival={arrival} />
        <SubSectionRenderHelper departure={departure} />
      </>
    ) : (
      <BookingDateTime />
    )
  )
}
