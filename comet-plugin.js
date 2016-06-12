#!/usr/bin/env node
'use strict';

const program = require('commander')
const utils = require('./utils')

program
  .parse(process.argv)

const action = program.args[0]
const plugin = program.args[1]

utils.run(`cordova plugin ${action} ${plugin} --save`)
  .catch((err) => {
    throw new Error(err)
  })
