#!/usr/bin/env node
const {program} = require('commander');
const shell = require('shelljs')
const inquirer = require('inquirer');
const {tpl, installTpl} = require('../src/templates')
const {initOptions}  = require('../src/core/config')
const init = require('../src/core/init')
const createPage = require('../src/core/createPage')

program
  .command(`create <projectName>`)
  .action(async (projectName, options) => {
    const res = await inquirer.prompt([
      {
        name: 'options',
        type: 'checkbox',
        message: 'use',
        choices: initOptions
      }
    ])
    console.log('starting please wait')
    init(projectName, res.options)
  })

program
  .command('add <pageName>')
  .action((pageName) => {
    createPage(pageName, {})
  })


program.parse(process.argv)
