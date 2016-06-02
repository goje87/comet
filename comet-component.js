#!/usr/bin/env
'use strict';

const program = require('commander');
const utils = require('./utils');
const yo = require('yeoman-environment').createEnv();

program
  .parse(process.argv);


const
  action = program.args[0],
  componentName = program.args[1],
  actions = {
    'create': () => {
      yo.run(['comet:component', componentName])
    }
  }

if(!componentName) {
  throw 'usage `comet component create <component-name>`'
}

yo.lookup(() => {
  if(actions[action]) actions[action]()
})
