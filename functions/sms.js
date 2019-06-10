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
