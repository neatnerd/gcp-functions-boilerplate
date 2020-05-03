<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Google Cloud Functions Boilerplate

## Purpose

This template allows to kickstart the development of Google Cloud Platform (GCP) functions keeping the best practices of software development.

## Cloud functions types

Official detailed documentation can be found [here](https://cloud.google.com/functions/docs/) and we strongly recommend you read it.

There are two types of cloud functions that are offered by GCP:

1. **HTTP Functions** are used when you need to serve a response immediately and are activated usually by an HTTP call
1. **Background functions** performs usually longer running operations and responds to events such as a file change or PubSub event

Parameters and challenges for setting up functions are fundamentally different as well.

HTTP functions are similar to setting up a middleware and you will deal with topics such as HTTP verbs, CORS and multipart requests. A lot of useful examples [here](https://cloud.google.com/functions/docs/writing/http). There are two obvious parameters - request(`req`) and response(`res`), so if you are familiar with Express, it should be self explanatory

Background functions are used when response and request are processed asynchronously. There is a plenty of triggers provided by GCP, for example PubSub(message queue) and GCP Storage(file changes watchers). The full list of triggers is available [here](https://cloud.google.com/functions/docs/calling). There are two parameters - `data` or `event` trigger specific and the `context` contains additionally the information about the request.


## Local setup

[Functions framework](https://github.com/GoogleCloudPlatform/functions-framework-nodejs) allows to run functions locally by serving them as a web service. To start services just run

```bash
npm run background-function
```
OR
```bash
npm run http-function
```

The port is defined in `package.json` as `localPort`.

## Smoke tests

To test HTTP function you can just curl the localhost port like this:

```bash
curl localhost:8080
```

Testing of background functions is more involved. Functions framework expects to pass certain headers, which does not correspond to actual behavior in productive environment. This is a bug well documented in [#96](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/issues/96) and in [#41](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/issues/41).
```bash
curl -d "@mockPubsub.json" \
  -X POST \
  -H "Ce-Type: true" \
  -H "Ce-Specversion: true" \
  -H "Ce-Source: true" \
  -H "Ce-Id: true" \
  -H "Content-Type: application/json" \
  http://localhost:8080
```


## Features

- [x] Templates functions
- [x] Linting
- [x] Unit test setup
- [ ] Integration test setup
- [ ] VS code configuration
- [ ] Deployment from local machine
- [ ] Deployment with Cloud Build
- [ ] System tests setup
- [ ] Docker image
