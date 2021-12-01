import { instance } from 'api/instance'

export const bookingEdit = {
  checkout: (data) => {
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    return (
      instance
        .post('bookings-edit', { ...data })
        .then(res => res?.data)
        // .catch(err => err )
    )
  },
}
