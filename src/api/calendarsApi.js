import { instance } from 'api/instance'

export const calendars = {
  submitIcal: (data) => {
    return (
      instance
        .post('order-id', { ...data })
        .then(res => res?.data)
    )
  },
}
