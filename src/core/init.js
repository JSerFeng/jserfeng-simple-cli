const shell = require('shelljs')
const { writeFile, resolvePath, joinPath } = require('../utils/helper')
const { tpl } = require('../templates')
const createPage = require('./createPage')

const init = async (projectName, options) => {
  const optionMap = new Set()
  for (let i = 0; i < options.length; i++) {
    const opt = options[i]
    optionMap.add(opt)
  }
  const ts = optionMap.has('ts')
  const redux = optionMap.has('redux')
  const axios = optionMap.has('axios')
  const router = optionMap.has('router')

  const ext = ts ? '.ts' : '.js'
  /* 创建react项目 */
  const { code } = shell.exec(`npx create-react-app ${projectName} ${ts ? '--template typescript' : ''}`)
  if (code !== 0) {
    console.log("some error happens when create-react-app running")
    return
  }
  shell.cd(projectName)
  const projectDir = shell.pwd().stdout
  installDep({redux, router, axios, ts})

  writeFile(joinPath(projectDir, 'jsf.config.js'), tpl('config', { ts, redux }))
  initDirections({ redux, axios, router })
  if (redux) {
    console.log('create redux file')
    const tplIndex = tpl('tpl_redux_index', { ts })
    const tplReducer = tpl('tpl_reducer', { ts })
    const tplActions = tpl('tpl_actions', { ts })
    const tplConstants = tpl('tpl_constants', { ts })
    writeFile(joinPath(projectDir, `/src/redux/index${ext}`), tplIndex)
    writeFile(joinPath(projectDir, `/src/redux/reducer${ext}`), tplReducer)
    writeFile(joinPath(projectDir, `/src/redux/actions${ext}`), tplActions)
    writeFile(joinPath(projectDir, `/src/redux/constants${ext}`), tplConstants)
  }
  if (axios) {
    console.log('create axios file')
    const tplIndex = tpl('tpl_axios_config', { ts })
    const tplApi = tpl('tpl_api', { ts })
    writeFile(joinPath(projectDir, `/src/services/index${ext}`), tplIndex)
    writeFile(joinPath(projectDir, `/src/services/api/index${ext}`), tplApi)
  }
  if (router) {
    console.log('create router file')
    const tplIndex = tpl('tpl_routes')
    writeFile(joinPath(projectDir, `/src/routes/index${ext}`), tplIndex)
  }
  createPage('Home', { ts, redux })
  console.log('\nHello World -v-')
}

function initDirections(options) {
  const { redux, axios, router } = options
  const curPath = process.cwd()
  const dirs = [joinPath(curPath, '/src/pages/home'), joinPath(__dirname, '/src/utils')]
  if (redux) {
    dirs.push(joinPath(curPath, '/src/redux'))
  }
  if (axios) {
    dirs.push(joinPath(curPath, '/src/services'))
    dirs.push(joinPath(curPath, '/src/services/api'))
  }
  if (router) {
    dirs.push(joinPath(curPath, '/src/routes'))
  }
  shell.mkdir('-p', dirs)
}

function installDep(options) {
  const { axios, router, redux, ts } = options
  let code = 0
  code = shell.exec('yarn add dart-sass -D')
  if (axios && !code)
    code = shell.exec(`yarn add axios`)
  if (redux && !code)
    code = shell.exec(`yarn add redux react-redux ${ts ? '@types/react-redux' : ''}`)
  if (router && !code)
    code = shell.exec(`yarn add react-router-dom`)
  if (!code)
    return
  console.log('意外退出')
  console.log(code)
}

module.exports = init
