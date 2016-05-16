#!/usr/bin/env node
'use strict';

const program = require('commander');
const mkdirp = require('mkdirp');
const pkg = require('./package.json');

function initialize() {
  createTempDir();
}

function createTempDir() {
  //create /tmp/goje87/comet if it does not already exist
  mkdirp.sync('/tmp/goje87/comet');
}

initialize();



program
  .version(pkg.version)
  .command('build <platform>', 'Build app for <platform>')
  .command('run <platfrom>', 'Run app on <platform>')
  .parse(process.argv);
