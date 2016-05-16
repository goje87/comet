#!/usr/bin/env node
'use strict';

const program = require('commander');
const utils = require('./utils');

var platform;

program
  .arguments('<platform>')
  .action(function(platformValue) {
    platform = platformValue;
  })
  .option('-e, --env [environment]', 'Run as a specific environment', 'dev')
  .parse(process.argv);

var envFlag = program.env ? `--env ${program.env}` : '';

utils.run(`com build ${platform} ${envFlag}`)
  .then(function() {
    utils.run(`cordova run ${platform}`)
  })
  .catch(function(err) {
    throw err;
  });
