

export const mapAddonsToUpdateSession = (formState) => {
  const addonsObject = formState.Addon
  if ( !addonsObject ) return []

  const resultArray = []
  console.log( 'FORM STATE', addonsObject)
  for (const key in addonsObject) {
    const value = addonsObject[key]
    if (value.count) {
      resultArray.push({ count: value.count, addon_id: Number(value.addon_id)})
    }
    console.log('key ', key, value)
  }

  return resultArray
}