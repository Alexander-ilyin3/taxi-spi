import { apiHost } from "api/apiHost";

export const reduceIconPath = (path) => {
  if (process.env.NODE_ENV === 'development') {
    return path
  }

  const url = new URL(apiHost || 'https://rebuild.sjdtaxi.com');
  
  return `${url.origin}/wp-content/plugins/sjd-booking/app/build/${path.replace(/^\//, '')}`
}
