import { instance } from 'api/instance'

export const session = {
  getSession: (data) => {
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    return (
      instance
        .post('update-cart', { /*...data, device: userAgent*/ })
        .then(res => res?.data)
      // .catch(err => err)
    )
  },
  updateSession: (data) => {

    return (
      instance
        .post('update-cart', { ...data }, /*{ params: { ...data } }*/)
        .then(res => res?.data)
      // .catch(err => err)
    )
  }
}
