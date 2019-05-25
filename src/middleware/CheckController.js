const { CONTROLLER } = require('../store/CONTROLLER')

function CheckController(req, res, next) {
  const { method, relativePath } = req
  const Con = CONTROLLER.find(v => v.PATH === relativePath)
  if (!Con || !Con.prototype[method]) return next()
  const r0 = new Con()
  try {
    r0[method](req, res)
  } catch (err) {
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'ERROR', msg: err.message })
  }
}
module.exports = CheckController