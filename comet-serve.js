#!/usr/bin/env node
'use strict';

const program = require('commander');
const utils = require('./utils');

program
  .option('-s, --stop', 'Stop server')
  .option('-t, --terminate', 'Terminate server')
  .parse(process.argv);

var action = '--no-daemon startOrRestart';

if(program.stop) {
  action = 'stop';
}
else if(program.terminate) {
  action = 'delete';
}

utils.run(`pm2 --silent ${action} ecosystem.json`)
