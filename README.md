# twemoji-image-functions

Cloud Functions which hosts twemoji with a predictable url.

![How it works](https://user-images.githubusercontent.com/34590683/159502537-9ad44518-f0f7-475b-a9bf-cb765b286870.png)

# Why?

You can get any twemoji urls without parsing DOM or text using [twemoji](https://www.npmjs.com/package/twemoji) or [twemoji-parser](https://www.npmjs.com/package/twemoji-parser).This will reduce client bundle size.

# Deployment

Example with [gcloud](https://cloud.google.com/sdk/gcloud):

```bash
gcloud functions deploy twemoji --region=[region-name] --memory=256 --timeout=3s --source=. --project=[gcp-project-name] --entry-point=twemoji --allow-unauthenticated
```