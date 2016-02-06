# zappr webtask

* Handle Github OAuth login webapp flow
* Forward Githook events to browser clients via Pushbullet or GCM.

**Description**

Github webhook --> webtask.io --> Pushbullet --> Browser

* [Webtask](https://webtask.io/docs/101)
* [Pushbullet](https://www.pushbullet.com)
    * https://docs.pushbullet.com/#pushbullet-api

**Create webtask**

To use [nconf](https://github.com/indexzero/nconf) based configuration,
export the following environment variables or create a file `config.json`:

```
{
  "GITHUB_CLIENT_ID": "****",
  "GITHUB_CLIENT_SECRET": "****",
  "PUSHBULLET_TOKEN": "****"
}
```

Create the webtask and url with this command:

```
npm run -s webtask
```
