export const reduceIconPath = (path) => {
  if (process.env.NODE_ENV === 'development') {
    return path
  }

  const url = new URL(window.sjd_inline_script.api_domain || 'https://rebuild.sjdtaxi.com');
  
  return `${url.host}/wp-content/plugins/sjd-booking/app/build/${path.replace(/^\//, '')}`
}
