import { createAction } from 'redux-actions'

export const RECEIVE_WEBHOOK = Symbol('receive webhook')

export const receiveWebhook = createAction(RECEIVE_WEBHOOK)
