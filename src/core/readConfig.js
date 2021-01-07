const {joinPath} = require('../utils/helper')

module.exports = function readConfig() {
  try {
    const conf = require(joinPath(process.cwd(), 'jsf.conf.js'))
    return conf
  } catch (e) {
    throw 'jsf.conf.js is not found at current direction' +
    'jsf.conf.js没有在当前目录下找到'
  }
}
