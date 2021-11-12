import { instance } from 'api/instance'

export const vehicles = {
  getVehicles: (data) => {
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    return (
      instance
        .get('vehicles', { params: { ...data } })
        .then(res => res?.data)
      // .catch(err => err)
    )
  },
}
