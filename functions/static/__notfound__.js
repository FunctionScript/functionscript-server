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
