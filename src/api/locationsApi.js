import { instance } from 'api/instance'

export const locations = {
  getLocations: (data) => {
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    return (
      instance
        .get('locations', { /*...data, device: userAgent*/ })
        .then(res => res?.data)
        // .catch(err => err )
    )
  },
}
