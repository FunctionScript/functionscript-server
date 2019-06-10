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
