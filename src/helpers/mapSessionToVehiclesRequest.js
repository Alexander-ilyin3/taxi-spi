

export const mapSessionToVehiclesRequest = (formState) => {
  if (!formState?.destinationLocation?.location_id || !formState?.pickupLocation?.location_id) return undefined

  return {
    pickup_location: formState.pickupLocation.location_id,
    destination: formState.destinationLocation.location_id
  }
}
