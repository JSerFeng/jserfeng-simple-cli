const {readFile, joinPath, exist, rm, pipe} = require('../utils/helper')
const {prompt} = require('inquirer')

const curDir = process.cwd() /* 当前目录 */

function tpl(tplName, option) {
  /*有后缀名*/
  if (!/\.js/.test(tplName)) {
    tplName += '.js'
  }

  return pickTemplate(tplName, option)
}

async function installTpl(tplName, tplLocation = curDir) {
  const writePath = joinPath(__dirname, 'repo', tplName)

  if (exist(writePath)) {
    const {rewrite} = await prompt([{
      type: 'list',
      name: 'rewrite',
      message: 'the template already exist, do you want to rewrite it ?',
      choices: ['yes', 'no'],
      default: 'no'
    }])

    if (rewrite === 'yes') {
      const {confirm} = await prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'are you sure to rewrite it, there is no way to get it back',
        default: false
      }])
      if (confirm) {

      }
    }

  }

  await pipe(tplLocation, writePath)
}

function removeTpl(tplName) {
  rm('/repo/'+ tplName)
  console.log(`remove ${tplName} success`)
}

function pickTemplate(tplName, option) {
  const file = readFile(joinPath(__dirname, 'repo', tplName))

  try {
    const runner = new Function(`return (${file.toString()})`)()
    return runner(option)
  } catch (e) {
    console.log(`模板${tplName}出错`)
    console.log(`unexpected error occurred from template ${tplName}`)
    console.log(e)
    process.exit(1)
  }
}

module.exports = {
  tpl,
  installTpl,
  pickTemplate,
  removeTpl
}
