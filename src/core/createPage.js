const {exist, joinPath, writeFile, readFile} = require('../utils/helper')
const shell = require('shelljs')
const {tpl} = require('../templates')

function readFromConf() {
  try {
    const conf = require(joinPath(process.cwd(), 'jsf.config.js'))
    return conf
  } catch (e) {
    throw 'jsf.conf.js is not found at current direction' +
    'jsf.conf.js没有在当前目录下找到'
  }
}

function updateRoutes(projectDir, options) {
  const {ts, pageName} = options
  try {
    const file = readFile(joinPath(projectDir, `/src/routes/index.${ts ? 'ts' : 'js'}`))
    if (!/\/\* __routes__ \*\//.test(file.toString())) {
      console.log('routes文件中没有/* __routes__ */标记，请手动添加标记')
      console.log('there is no /* __routes__ */ marks in the routes file, please add one')
      return
    }
    let [prevRoutes, remain] = file.toString().split('/* __routes__ */')
    prevRoutes += `{
  path: '/${pageName.toLowerCase()}',
  name: '${pageName.toLowerCase()}',
  components: ${pageName}
},`
    const resetRoutes = [
      `import ${pageName} from '../pages/${pageName.toLowerCase()}'`,
      prevRoutes,
      '/* __routes__ */',
      remain
    ]
    writeFile(joinPath(projectDir, `/src/routes.${ts ? 'ts' : 'js'}`), resetRoutes.join(''))
  } catch (e) {
    /* 没有routes文件 */
    console.log('未创建routes文件')
  }
}

module.exports = function createPages(pageName, option) {
  const {ts, redux, routes} = readFromConf()
  const ext = ts ? '.ts' : '.js'
  const extx = ext + 'x'

  const projectDir = process.cwd()
  const pageDir = joinPath(projectDir, 'src/pages')
  if (!pageDir) throw 'no valid path'

  const curPageDir = joinPath(pageDir, `${pageName}`)

  if (!exist(curPageDir)) {
    shell.mkdir('-p', curPageDir)
  }

  /*index页面*/
  const curPage = pageName.toLowerCase()
  const indexPath = joinPath(pageDir, curPage, '/index' + extx)
  const stylePath = joinPath(pageDir, curPage, '/style.scss')
  writeFile(indexPath, tpl('tpl_page_index', {pageName, redux, ts}))
  writeFile(stylePath, '')

  /*生成页面中redux页面*/
  if (redux) {
    const reduxDir = joinPath(projectDir, `/src/pages/${curPage}/store`)
    shell.mkdir('-p', reduxDir)
    /* 创建store目录下redux四个文件 */
    writeFile(joinPath(reduxDir, '/index' + extx), tpl('page_redux_index', {ts}))
    writeFile(joinPath(reduxDir, '/actions' + extx), tpl('tpl_actions', {ts}))
    writeFile(joinPath(reduxDir, '/constants' + extx), tpl('tpl_constants', {ts}))
    writeFile(joinPath(reduxDir, '/reducer' + extx), tpl('tpl_reducer', {ts}))
  }

  if (routes) {
    /*更新路由*/
    updateRoutes(projectDir, {ts, pageName})
  }
}
