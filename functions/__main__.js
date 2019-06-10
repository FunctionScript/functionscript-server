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
