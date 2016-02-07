/**
 * Parse the current query string into an object of parameters.
 *
 * @returns {object}
 */
export function parseQueryString() {
  const query = window.location.search
  if (!query) return {}

  return query.substring(1).split('&')
  .map(s => s.split('='))
  .map(x => ({
    [x[0]]: x[1]
  }))
  .reduce((o, kv) => Object.assign(o, kv))
}
