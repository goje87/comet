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
  .command('init', 'Intialize current directory as a comet project')
  .command('component create <comp-name>', 'Create a component; name should be hyphenated')
  .command('page create <page-name>', 'Create a page')
  .command('build <platform>', 'Build app for <platform>')
  .command('serve [options]', 'Start (or restart) server to serve as web app')
  .command('appify', 'Initialize current project as mobile app')
  .command('platform add <platform>', 'Add a cordova platform')
  .command('platform remove <platform>', 'Remove a cordova platform')
  .command('plugin add <plugin>', 'Add a cordova plugin')
  .command('plugin remove <plugin>', 'Remove a cordova plugin')
  .command('run <platfrom>', 'Run app on <platform>')
  .parse(process.argv);
