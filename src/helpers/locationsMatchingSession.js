
export const locationsMatchingSession = ({
  formDestination,
  formLocation,
  sessionLocation,
  sessionDestination,
  sessionIsRoundTrip,
  formIsRoundTrip
}) => {

  const allValueIsDefined = (
    !!formDestination?.destination_id
    && !!sessionDestination?.destination_id
    && !!formLocation?.location_id
    && !!sessionLocation?.location_id
    && sessionIsRoundTrip !== undefined
    && typeof formIsRoundTrip === 'boolean'
  )

  if (!allValueIsDefined) return false

  return (
    String(formDestination.destination_id) === String(sessionDestination.destination_id)
    &&
    String(formLocation?.location_id) === String(sessionLocation?.location_id)
    && 
    Boolean(sessionIsRoundTrip) === Boolean(formIsRoundTrip)
  )
}
