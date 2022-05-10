import { apiHost } from "api/apiHost";

export const reduceIconPath = (path) => {
  if (process.env.NODE_ENV === 'development') {
    return path
  }
  const pluginDirUrl = window.sjd_inline_script.plugin_dir_url
  
  return `${pluginDirUrl}/app/build/${path.replace(/^\//, '')}`
}
