# functionscript-server

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

A simple Heroku-based example of FunctionScript API Development

[![FunctionScript](./static/images/fs-wordmark.png)](https://github.com/FunctionScript/FunctionScript)

## Introduction

This is a simple Heroku-based example of [FunctionScript](https://github.com/FunctionScript/FunctionScript)
API development using the FunctionScript Gateway. Though [FunctionScript](https://github.com/FunctionScript/FunctionScript)
is primarily intended to be used alongside serverless compute models, including
being the primary development model for [Standard Library](https://stdlib.com) APIs,
the Gateway is easily manipulable to be able to handle requests on a standalone
server -- and [Heroku](https://heroku.com) is the best place to get started.

You can deploy to Heroku *instantly* by clicking the button below, or follow the
instructions contained here to clone this repository and play locally.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## API Endpoints

### `./function/__main__.js`

Reads `./pages/index.html` and uses it as a simple HTML template

### `./functions/add.js`

Adds two numbers together with a hello message, returns JSON string

### `./functions/sms.js`

Uses [utils/sms](https://stdlib.com/@utils/lib/sms) to send an SMS message

### `./function/static/__notfound__.js`

Routes static resources from `./static/` directory based on pathname

## Acknowledgements

Thanks to those who helped with the example!

### Contributors

- [Steve Meyer](https://twitter.com/notoriage)
- [Keith Horwood](https://twitter.com/keithwhor)

FunctionScript is (c) 2019 Polybit Inc.
