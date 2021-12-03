import { instance } from 'api/instance'

export const bookingEdit = {
  checkout: (data) => {
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    if (data?.order_id === null) {
      return Promise.resolve('skip')
    }

    return (
      instance
        .post('bookings-edit', { ...data })
        .then(res => res?.data)
      // .catch(err => err )
    )
  },
}
