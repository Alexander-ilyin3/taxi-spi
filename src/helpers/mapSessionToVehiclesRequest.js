

export const mapSessionToVehiclesRequest = (formState) => {
  if (!formState?.destinationLocation?.destination_id || !formState?.pickupLocation?.location_id) return undefined

  return {
    pickup_location: formState.pickupLocation.location_id,
    destination: formState.destinationLocation.destination_id
  }
}
