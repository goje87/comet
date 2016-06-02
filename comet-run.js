#!/usr/bin/env node
'use strict';

const program = require('commander');
const utils = require('./utils');

program
  .option('-e, --env [environment]', 'Run as a specific environment', 'dev')
  .parse(process.argv);

var platform = program.args[0];
var envFlag = program.env ? `--env ${program.env}` : '';

utils.run(`comet build ${envFlag}`)
  .then(function() {
    utils.run(`cordova run ${platform}`);
  })
  .catch(function(err) {
    console.error(err);
  });
