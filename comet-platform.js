#!/usr/bin/env node
'use strict';

const program = require('commander')
const utils = require('./utils')

program
  .parse(process.argv)

console.log(program.args)
const action = program.args[0]
const platform = program.args[1]

utils.run(`cordova platform ${action} ${platform}`)
  .catch((err) => {
    throw new Error(err)
  })
