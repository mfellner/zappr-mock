export function dispatch(inject) {
  return (dispatch, getState) => (
    dispatch(inject({
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${getState().oauth.github.accessToken}`
    }, getState()))
  )
}
