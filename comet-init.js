#!/usr/bin/env node
'use strict';

const program = require('commander');
const yo = require('yeoman-environment').createEnv();

yo.lookup(() => {
  yo.run(['comet'])
});
