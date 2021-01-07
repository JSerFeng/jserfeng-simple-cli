const fs = require('fs')
const path = require('path')

const writeFile = (_path, _tpl, rewrite = true) => {
  if (fs.existsSync(_path) && rewrite) {
    fs.unlinkSync(_path)
  }
  fs.writeFileSync(_path, _tpl)
}

const mkDir = (dir) => {
  if (/\//.test(dir)) { /* 处理 "a/b/c" 这种目录 */
    dir
      .split('/')
      .filter(str => str) /* 防止 a//b 以及 /a/b */
      .reduce((prev, cur) => {
        let _dir = prev ? prev + '/' + cur : cur
        if (!exist(_dir)) {
          fs.mkdirSync(_dir)
        }

        return _dir
      }, '')
  } else {
    fs.mkdirSync(dir)
  }
}

const exist = (...args) => {
  return fs.existsSync(...args)
}

const resolvePath = (...args) => {
  return path.resolve(...args)
}

const joinPath = (...args) => {
  return path.join(...args)
}

const readFile = (_path) => {
  return fs.readFileSync(_path)
}

const rs = (_path) => fs.createReadStream(_path)

const ws = (_path) => fs.createWriteStream(_path)

const pipe = async (from, to, rewrite = true) => {
  if (rewrite) {
    await fs.unlink(to)
  }
  const rs = fs.createReadStream(from)
  const ws = fs.createWriteStream(to)
  return new Promise((resolve, reject) => {
    rs.pipe(ws)
    ws.on('end', resolve)
    ws.on('error', reject)
  })
}

const rm = async (path) => {
  return await fs.unlink(path)
}

module.exports = {
  writeFile,
  mkDir,
  exist,
  resolvePath,
  joinPath,
  readFile,
  rs,
  ws,
  pipe,
  rm
}
