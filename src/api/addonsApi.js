import { instance } from 'api/instance'

export const addons = {
  getAddons: (data) => {
    // const userAgent = window.navigator.userAgent || "userAgent - undefined";
    console.log('data for request - ', data)
    return (
      instance
        .get('addons', { params: { ...data } })
        .then(res => res?.data)
      // .catch(err => err)
    )
  },
}
