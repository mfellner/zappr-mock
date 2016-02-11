import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

import { dispatch } from './'
import { GITHUB_URL, WEBTASK_URL } from '../../config'

export const REQUEST_REPOSITORIES = Symbol('request repositories')
export const RECEIVE_REPOSITORIES = Symbol('receive repositories')
export const REQUEST_HOOKS = Symbol('request hooks')
export const RECEIVE_HOOKS = Symbol('receive hooks')
export const CREATE_HOOK = Symbol('create hook')
export const DELETE_HOOK = Symbol('delete hook')

const requestRepositories = createAction(REQUEST_REPOSITORIES)
const receiveRepositories = createAction(RECEIVE_REPOSITORIES)
const requestHooks = createAction(REQUEST_HOOKS)
const receiveHooks = createAction(RECEIVE_HOOKS)
const createHookAction = createAction(CREATE_HOOK)
const deleteHookAction = createAction(DELETE_HOOK)

/**
 * https://developer.github.com/v3/repos/#list-your-repositories
 */
export function fetchRepositories() {
  requestRepositories()
  return dispatch(headers => receiveRepositories(
    fetch(`${GITHUB_URL}/user/repos`, {
      method: 'GET',
      headers
    })
    .then(response => response.json())
  ))
}

/**
 * https://developer.github.com/v3/repos/hooks/#list-hooks
 */
export function fetchHooks(owner, repo) {
  const fullName = `${owner}/${repo}`
  requestHooks({fullName})
  return dispatch(headers => receiveHooks(
    fetch(`${GITHUB_URL}/repos/${owner}/${repo}/hooks`, {
      method: 'GET',
      headers
    })
    .then(response => response.json())
    .then(hooks => ({fullName, hooks}))
  ))
}

/**
 * https://developer.github.com/v3/repos/hooks/#create-a-hook
 */
export function createHook(owner, repo, events = ['*']) {
  const fullName = `${owner}/${repo}`
  return dispatch((headers, state) => {
    const {pushbullet} = state.oauth
    const hook = {
      name: 'web',
      active: true,
      events,
      config: {
        url: `${WEBTASK_URL}&pushbullet_token=${pushbullet.accessToken}`,
        content_type: 'json'
      }
    }
    return createHookAction(
      fetch(`${GITHUB_URL}/repos/${owner}/${repo}/hooks`, {
        method: 'POST',
        headers,
        body: JSON.stringify(hook)
      })
      .then(response => response.json())
      .then(hook => ({fullName, hook}))
    )
  })
}

/**
 * https://developer.github.com/v3/repos/hooks/#delete-a-hook
 */
export function deleteHook(owner, repo, id) {
  const fullName = `${owner}/${repo}`
  return dispatch(headers => deleteHookAction(
    fetch(`${GITHUB_URL}/repos/${owner}/${repo}/hooks/${id}`, {
      method: 'DELETE',
      headers
    })
    .then(() => ({fullName, id}))
  ))
}
