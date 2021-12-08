import { instance } from 'api/instance'

export const calendars = {
  submitIcal: (data) => {
    console.log('data from request API', data)
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    return (
      instance
        .post('order-id', { ...data })
        .then(res => res?.data)
      // .catch(err => err)
    )
  },
}
