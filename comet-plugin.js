#!/usr/bin/env node
'use strict';

const program = require('commander')
const utils = require('./utils')
const fs = require('fs-extra')

program
  .parse(process.argv)

const action = program.args[0]
const plugin = program.args[1]

if (action === 'reload') {
  var plugins = fs.readJsonSync('plugins/fetch.json')
    , pluginPath = plugin
    , config = plugins[plugin]

  if (!config) throw new Error(`Cannot find plugin '${plugin}' in project`)

  utils.run(`cordova plugin remove ${plugin}`)
    .then(() => {
      return utils.run(`cordova plugin add ${config.source.path}`)
    })
    .catch((err) => {
      throw new Error(err)
    })
}
else {
  utils.run(`cordova plugin ${action} ${plugin} --save`)
    .catch((err) => {
      throw new Error(err)
    })
}
