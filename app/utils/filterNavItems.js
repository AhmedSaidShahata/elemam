/**
 * Returns an array of feature identifier strings that are excluded
 * for the given company (based on excluded_system_features).
 *
 * @param {Object} company
 * @returns {string[]}
 */
export const getExcludedFeatureIdentifiers = (company = {}) => {
  const excluded = company?.excluded_system_features || []
  return excluded.map((feature) => feature?.identifier).filter(Boolean)
}

/**
 * Recursively filters nav items, removing any item whose identifier
 * is in the excludedFeatureIdentifiers list.  Items with moreItems
 * arrays are also filtered recursively; if the result is empty and the
 * item has no direct `to`, the item itself is removed.
 *
 * @param {Array}    items
 * @param {string[]} excludedFeatureIdentifiers
 * @returns {Array}
 */
export const filterNavItemsByExcludedFeatures = (
  items,
  excludedFeatureIdentifiers = []
) => {
  if (!Array.isArray(items) || !excludedFeatureIdentifiers.length) return items

  const shouldExclude = (item) =>
    !!item?.identifier && excludedFeatureIdentifiers.includes(item.identifier)

  const normalizeItem = (item) => {
    if (!item || shouldExclude(item)) return null

    if (item.moreItems) {
      const filteredMoreItems = item.moreItems
        .map(normalizeItem)
        .filter(Boolean)

      if (filteredMoreItems.length) {
        return { ...item, moreItems: filteredMoreItems }
      }

      if (item.to) {
        return { ...item, moreItems: [] }
      }

      return null
    }

    return item
  }

  return items.map(normalizeItem).filter(Boolean)
}
