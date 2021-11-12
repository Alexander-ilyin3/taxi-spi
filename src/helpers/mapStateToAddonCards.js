

export const mapStateToAddonCards = (stateAddons) => {
  const getPicSource = (value) => {
    if (process.env.NODE_ENV === 'development') {
      return value.replace('https://sjd-taxi.requestumdemo.com', '')
    }
    return value
  }
  
  return stateAddons.map(addon => {
    return {
      description: addon?.description || '',
      name: addon.name || 'Addon - ' + addon.addon_id || '',
      price: Number(addon.price),
      src: getPicSource(addon.image),
      addon_id: addon.addon_id,
    }
  })
}
