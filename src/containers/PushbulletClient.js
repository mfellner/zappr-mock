export default class PushbulletClient {
  constructor(onPush) {
    this.onPush = onPush
    this.ws = null
  }

  init() {
    if (this.ws) ws.close()

    this.ws = new WebSocket(`wss://${PUSHBULLET_URL}/${PUSHBULLET_TOKEN}`)

    this.ws.onopen = e => {
      console.log('pushbullet open %o', e)
    }

    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.type === 'push') {
        this.onPush(JSON.parse(data.push))
      } else if (data.type !== 'noop') {
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
