/**
 * A simple "hello world" function
 * @param {string} name
 * @returns {string} greeting
 */
module.exports = async (name = 'world') => {
  return `Hello ${name}`;
};
