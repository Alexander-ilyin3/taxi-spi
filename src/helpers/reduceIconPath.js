export const reduceIconPath = (path) => {
  if (process.env.NODE_ENV === 'development') {
    return path
  }

  return 'https://sjd-taxi.requestumdemo.com/wp-content/plugins/sjd-booking/app/build/images/' + path
}
