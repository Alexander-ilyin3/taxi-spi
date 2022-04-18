import { instance } from 'api/instance'

export const addons = {
  getAddons: (data) => {
    return (
      instance
        .get('addons', { params: { ...data } })
        .then(res => res?.data)
    )
  },
}
