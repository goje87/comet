#!/usr/bin/env node
'use strict';

const program = require('commander');
const _ = require('lodash');
const browserify = require('browserify');
const fs = require('fs-extra');
const config = require(`${__dirname}/config.json`);

var platform;

program
  .arguments('<platform>')
  .action(function(platformValue) {
    platform = platformValue;
  })
  .option('-e, --env [environment]', 'Build for a specific environment', 'dev')
  .parse(process.argv);


function readConfigSync(path) {
  var config = {};

  try {
    config = fs.readJsonSync(path);
  }
  catch (ex) { }

  return config;
}

function prepareProjectConfig() {
  var
    projectConfig = {},
    projectBaseConfig = readConfigSync(`${config.configRoot}/config.base.json`),
    projectEnvConfig = readConfigSync(`${config.configRoot}/config.${program.env}.json`);

  _.assignIn(projectConfig, projectBaseConfig, projectEnvConfig);

  return new Promise(function(resolve, reject) {
    fs.outputJson(`${config.tmpRoot}/config.json`, projectConfig, {spaces: 2}, function(err) {
      err ? reject(err) : resolve();
    });
  });
}

function prepareProjectComet() {
  var
    b = browserify(),
    readStream, writeStream;

  return new Promise(function(resolve, reject) {
    b.require(`${__dirname}/scripts/comet.js`, {expose: 'comet'});
    b.require(`${config.tmpRoot}/config.json`, {expose: 'projectConfig'});

    readStream = b.bundle();
    writeStream = fs.createWriteStream(`${config.tmpRoot}/comet.out.js`);

    readStream.on('end', resolve);
    readStream.on('error', reject);

    readStream.pipe(writeStream);
  });
}

function copyFile(from, to) {
  return new Promise(function(resolve, reject) {
    fs.copy(from, to, function(err) {
      if(err) reject(err);
      else resolve();
    });
  });
}

function copyFilesToProject() {
  var promises = [];

  [
    'comet.out.js'
  ]
  .map(function(file) {
    var promise = copyFile(`${config.tmpRoot}/${file}`, `${config.jsRoot}/${file}`);
    promises.push(promise);
  });

  return Promise.all(promises);
}

prepareProjectConfig()
  .then(prepareProjectComet)
  .then(copyFilesToProject)
  .catch(function(err) {
    throw err;
  });
