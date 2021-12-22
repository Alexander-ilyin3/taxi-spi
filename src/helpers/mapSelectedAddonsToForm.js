export const mapSelectedAddonsToForm = (addonsArray) => {
  const resultObject = {}

  // { "Addon": { "id_1": { "addon_id": "1", "count": 0 }, "id_2": { "addon_id": "2", "count": 0 }, "id_4": { "addon_id": "4", "count": 1 } } }
  // { addon_id: 2, count: 1, price: "35" }
  if (Array.isArray(addonsArray)) {
    addonsArray.forEach(addonObject => {
      Object.assign(
        resultObject,
        {
          ['id_' + addonObject.addon_id]: {
            addon_id: String(addonObject.addon_id),
            count: addonObject.count,
            price: Number(addonObject.price),
            name: addonObject.name
          }
        }
      )
    }) //TODO addont can be no persisting in addon list
  }

  return resultObject
}