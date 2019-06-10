# functionscript-server
## A simple Heroku-based example of FunctionScript API Development

[![FunctionScript](./static/images/fs-wordmark.png)](https://github.com/FunctionScript/FunctionScript)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Introduction

This is a simple Heroku-based example of [FunctionScript](https://github.com/FunctionScript/FunctionScript)
API development using the FunctionScript Gateway. Though [FunctionScript](https://github.com/FunctionScript/FunctionScript)
is primarily intended to be used alongside serverless compute models, the
Gateway is easily manipulable to be able to handle requests on a standalone
server -- and [Heroku](https://heroku.com) is the best place to get started, there.

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
