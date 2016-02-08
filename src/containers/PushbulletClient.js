import { PUSHBULLET_URL } from '../config'

export default class PushbulletClient {
  constructor(onPush) {
    this.onPush = onPush
    this.ws = null
  }

  init(accessToken) {
    if (this.ws) this.ws.close()
    if (!accessToken) throw new Error('pushbullet access token not set')

    this.ws = new WebSocket(`${PUSHBULLET_URL}/${accessToken}`)

    this.ws.onopen = e => {
      console.log('pushbullet open %o', e)
    }

    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.type === 'push') {
        this.onPush(JSON.parse(data.push))
      } else if (data.type !== 'nop') {
        console.log('pushbullet %s %o', data.type, e)
      }
    }

    this.ws.onerror = e => {
      console.error('pushbullet error %o', e)
    }

    this.ws.onclose = e => {
      console.close('pushbullet close %o', e)
    }
  }
}
