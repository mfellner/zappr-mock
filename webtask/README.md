# githook webtask

Forward Githook events to browser clients via Pushbullet or GCM.

**Description**

Github webhook --> webtask.io --> Pushbullet/GCM --> Browser

* [Webtask](https://webtask.io/docs/101)
* [Pushbullet](https://www.pushbullet.com): websocket
    * https://docs.pushbullet.com/#pushbullet-api
* [Google Cloud Messaging](https://developers.google.com/cloud-messaging): service-worker
    * https://developers.google.com/cloud-messaging/chrome/client
    * https://developers.google.com/web/fundamentals/getting-started/push-notifications/?hl=en

**Create webtask**

```
wt create webtask/githook.js \
  --prod \
  --name zappr-githook \
  --secret PUSHBULLET_TOKEN=$(cat webtask/pushbullet_token | tr -d "\n") \
  --output token-url
```
