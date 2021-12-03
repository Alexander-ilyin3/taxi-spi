
export const locationsMatchingSession = ({
  formDestination,
  formLocation,
  sessionLocation,
  sessionDestination,
  sessionIsRoundTrip,
  formIsRoundTrip
}) => {

  const allValueIsDefined = (
    !!formDestination?.location_id
    && !!sessionDestination?.location_id
    && !!formLocation?.location_id
    && !!sessionLocation?.location_id
    && sessionIsRoundTrip !== undefined
    && typeof formIsRoundTrip === 'boolean'
  )

  if (!allValueIsDefined) return false

  return (
    String(formDestination.location_id) === String(sessionDestination.location_id)
    &&
    String(formLocation?.location_id) === String(sessionLocation?.location_id)
    &&
    Boolean(sessionIsRoundTrip) === Boolean(formIsRoundTrip)
  )
}
