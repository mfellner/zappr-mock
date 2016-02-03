# githook webtask

**Description**

Github webhook --> webtask.io --> Pushbullet/GCM --> Browser

* [Webtask](https://webtask.io/docs/101)
* [Pushbullet](https://www.pushbullet.com)
    * https://docs.pushbullet.com/#pushbullet-api
* [Google Cloud Messaging](https://developers.google.com/cloud-messaging)
    * https://developers.google.com/cloud-messaging/chrome/client
    * https://developers.google.com/web/fundamentals/getting-started/push-notifications/?hl=en

**Create webtask**

```
wt create webtask/githook.js \
  --name zappr-githook \
  --secret PUSHBULLET_TOKEN=$(cat webtask/pushbullet_token | tr -d "\n") \
  --secret WEBHOOK_SECRET=$(cat webtask/webhook_secret | tr -d "\n")
```
