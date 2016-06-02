#!/usr/bin/env
'use strict';

const program = require('commander');
const utils = require('./utils');
const yo = require('yeoman-environment').createEnv();

program
  .parse(process.argv);


const
  action = program.args[0],
  pageName = program.args[1],
  actions = {
    'create': () => {
      yo.run(['comet:page', pageName])
    }
  }

if(!pageName) {
  throw 'usage `comet page create <name>`'
}

yo.lookup(() => {
  if(actions[action]) actions[action]()
})
