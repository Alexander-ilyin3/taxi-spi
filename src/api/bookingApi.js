import { instance } from 'api/instance'

export const booking = {
  submit: (data) => {
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    return (
      instance
        .post('bookings', { /*...data, device: userAgent*/ })
        .then(res => res?.data)
        // .catch(err => err )
    )
  },
}
