# functionscript-server

A simple Heroku-based example of FunctionScript API Development

[![FunctionScript](./static/images/fs-wordmark.png)](https://github.com/FunctionScript/FunctionScript)

## Introduction

You can use this repository to build a brand new [FunctionScript](https://github.com/FunctionScript/FunctionScript)
API in a flash. It's the simplest way to build an API, routing is handled
automatically by the file structure. HTTP GET and POST requests are handled
identically, treating each endpoint with a more **imperative**, or command-based
approach. Instead of `HTTP POST /users/` to create a user resource, for example,
we'd recommend a `/createUser/` endpoint.

A simple summary is that all JavaScript files in the `./functions` folder will
be automatically turned into API endpoints with:

1. Automatic type coercion
2. Automatic error handling
3. Differentiation between required / optional parameters
4. Embedded support for API Schemas

The example contained here is intended for deployment on Heroku, and used the
[FunctionScript](https://github.com/FunctionScript/FunctionScript) Daemon and Gateway to handle requests.
Though [FunctionScript](https://github.com/FunctionScript/FunctionScript)
is primarily intended to be used alongside serverless compute models, including
being the primary development model for [Standard Library](https://stdlib.com) APIs,
the Gateway is easily manipulable to be able to handle requests on a standalone
server -- and [Heroku](https://heroku.com) is the best place to get started.

## Installation

You can deploy to Heroku *instantly* by clicking the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

If you're feeling adventurous, you can set up the server locally by following
these instructions:

```shell
$ git clone git@github.com:FunctionScript/functionscript-server.git
$ cd functionscript-server
$ npm install
$ npm start
```

That's it! You're done!


## API Endpoints

There are four API endpoints that serve different purposes to introduce
you to the basics of [FunctionScript](https://github.com/FunctionScript/FunctionScript)

### `./function/__main__.js`

Reads `./pages/index.html` and uses it as a simple HTML template. In this example,
you're introduced to the `{object.http}` type for returning HTTP responses. The
default response type is JSON.

```javascript
const fs = require('fs');
const PAGE = fs.readFileSync('./pages/index.html').toString();

/**
* This API endpoint simply serves a static HTML page.
*   It replaces all instances of `{%varname}` with corresponding GET / POST
*   parameters. The default is to respond to the `name` parameter
* @param {string} name A name to enter.
* @returns {object.http} response The HTTP response
*/
module.exports = async (name = 'world', context) => {
  let render = PAGE.replace(/\{\%([\w]+)\}/gi, ($0, $1) => context.params[$1]);
  return {
    headers: {
      'Content-Type': 'text/html'
    },
    body: render
  };
};
```

### `./functions/add.js`

Adds two numbers together with a hello message, returns JSON string. This example
shows you the built-in FuncitonScript error-handling using required parameters.

```javascript
/**
* A simple API that adds two numbers together. `a` and `b` are required parameters
*   and the API will automatically throw an error if they are not provided
* @param {string} name A name to enter.
* @param {number} a The first of two numbers to add.
* @param {number} b The second of two numbers to add.
* @returns {string} message A simple hello mesage
*/
module.exports = async (name = 'world', a, b) => {
  return `Hello ${name}, ${a} + ${b} = ${a + b}!`;
};
```

### `./functions/sms.js`

Uses [utils/sms](https://stdlib.com/@utils/lib/sms) to send an SMS message.
This example shows off a little of the power of [Standard Library](https://stdlib.com),
a central registry of [FunctionScript](https://github.com/FunctionScript/FunctionScript)-powered
APIs. You can obtain your own `STDLIB_SECRET_TOKEN` by registering on
Standard Library.

```javascript
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* Sends an SMS using https://stdlib.com/@utils/lib/sms
* @param {string} tel A telephone number to send SMS to
* @param {string} body A message body to send
* @returns {object} result The result of the SMS
*/
module.exports = async (tel, body) => {
  let result = await lib.utils.sms['@1.0.11']({
    to: tel,
    body: `Testing from FunctionScript Server:\n${body}`
  });
  return result;
};
```

### `./functions/static/__notfound__.js`

Routes static resources from `./static/` directory based on pathname. This
is a comprehensive example that reads from multiple different folders
and serves different HTTP headers (`"Content-Type"`) based on the filenames
it's serving. It is also an introduction to the `__notfound__.js` handler.

```javascript
const mime = require('mime');

const fileio = require('../../helpers/fileio.js');

let filepath = './static';
let staticFiles = fileio.readFiles(filepath);

/**
 * This endpoint handles all routes to `/static` over HTTP, and maps them to the
 *  `./static` directory (part of the root dir)
 * It is a special example of a "NOT FOUND" handler, which any request not
 *   matching an existing functions/ API endpoint will be routed to
 * `context.path` can be used to retrieve the path name
 * @returns {object.http}
 */
module.exports = async (context) => {

  // Hot reload for local development
  if (process.env.NODE_ENV !== 'release') {
    staticFiles = fileio.readFiles(filepath);
  }

  let pathEnd = context.path.slice().pop();
  let staticFilepath = context.path.slice(1).join('/');
  let file = pathEnd.indexOf('.') !== -1
    ? staticFiles[staticFilepath]
    : (
      staticFiles[[staticFilepath, 'index.htm'].filter(v => !!v).join('/')] ||
      staticFiles[[staticFilepath, 'index.html'].filter(v => !!v).join('/')]
    );

  if (!file) {
    return {
      statusCode: 404,
      body: '404 - Not Found',
      headers: {
        'Content-Type': 'text/plain'
      }
    };
  }

  let cacheControl = process.env.NODE_ENV === 'release'
    ? 'max-age=31536000'
    : 'max-age=0';

  return {
    statusCode: 200,
    body: Buffer.from(file),
    headers: {
      'Content-Type': mime.getType(staticFilepath),
      'Cache-Control': cacheControl
    }
  };
};
```

## Acknowledgements

Thanks to those who helped with the example!

### Contributors

- [Steve Meyer](https://twitter.com/notoriaga)
- [Keith Horwood](https://twitter.com/keithwhor)

FunctionScript is (c) 2019 Polybit Inc.
